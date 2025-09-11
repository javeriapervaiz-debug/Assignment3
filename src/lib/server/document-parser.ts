// src/lib/server/document-parser.ts
// Note: pdf-parse is imported dynamically to avoid module initialization issues

export interface ParsedDocument {
  title: string;
  content: string;
  fileType: string;
  fileSize: number;
}

/**
 * Parse text files (txt, md, etc.)
 */
export async function parseText(file: File): Promise<ParsedDocument> {
  const content = await file.text();
  const title = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
  
  return {
    title,
    content: content.trim(),
    fileType: file.type || 'text/plain',
    fileSize: file.size
  };
}

/**
 * Parse Markdown files
 */
export async function parseMarkdown(file: File): Promise<ParsedDocument> {
  const content = await file.text();
  const title = extractMarkdownTitle(content) || file.name.replace(/\.[^/.]+$/, '');
  
  return {
    title,
    content: content.trim(),
    fileType: 'text/markdown',
    fileSize: file.size
  };
}

/**
 * Parse PDF files using pdfjs-dist with advanced text extraction
 */
export async function parsePDF(file: File): Promise<ParsedDocument> {
  const title = file.name.replace(/\.[^/.]+$/, '');

  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Dynamic import of pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configure pdfjs-dist for Node.js environment
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
    
    // Load the PDF document with enhanced options
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      disableFontFace: false,
      disableRange: false,
      disableStream: false,
      disableAutoFetch: false,
      maxImageSize: 1024 * 1024, // 1MB
      isEvalSupported: false,
      useWorkerFetch: false,
      verbosity: 0
    });

    const pdf = await loadingTask.promise;
    let fullText = '';
    let pageTexts: string[] = [];

    console.log(`PDF loaded: ${pdf.numPages} pages`);

    // Extract text from each page with enhanced options
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent({
          normalizeWhitespace: false,
          disableCombineTextItems: false
        });

        // Extract text items with better formatting
        const pageText = textContent.items
          .map((item: any) => {
            if (item.str) {
              return item.str;
            }
            return '';
          })
          .join(' ')
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();

        pageTexts.push(pageText);
        fullText += pageText + '\n\n';
        
        console.log(`Page ${pageNum}: ${pageText.length} characters extracted`);
      } catch (pageError) {
        console.error(`Error extracting page ${pageNum}:`, pageError);
        pageTexts.push(`[Error extracting page ${pageNum}]`);
      }
    }

    // Clean up the extracted text with better formatting
    let content = fullText
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple newlines with double newline
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n /g, '\n') // Remove spaces at start of lines
      .replace(/ \n/g, '\n') // Remove spaces at end of lines
      .trim();

    // If no text was extracted, provide a helpful message
    if (!content || content.length < 10) {
      content = `[PDF Content - ${file.name}]\n\nThis PDF appears to contain images or non-text content that couldn't be extracted. The PDF has ${pdf.numPages} page(s).`;
    } else {
      // Add page information for better context
      content = `[PDF Content - ${file.name}]\n\n${content}\n\n[End of PDF - ${pdf.numPages} pages total]`;
    }

    console.log(`PDF parsing completed: ${content.length} total characters`);

    return {
      title,
      content,
      fileType: 'application/pdf',
      fileSize: file.size
    };
  } catch (error) {
    console.error('PDF parsing error:', error);

    // Return a fallback if PDF parsing fails
    return {
      title,
      content: `[PDF Content - ${file.name}]\n\nError parsing PDF: ${error instanceof Error ? error.message : 'Unknown error'}. The file may be corrupted or password-protected.`,
      fileType: 'application/pdf',
      fileSize: file.size
    };
  }
}

/**
 * Parse JSON files
 */
export async function parseJSON(file: File): Promise<ParsedDocument> {
  const content = await file.text();
  const title = file.name.replace(/\.[^/.]+$/, '');
  
  try {
    const jsonData = JSON.parse(content);
    // Convert JSON to readable text
    const readableContent = JSON.stringify(jsonData, null, 2);
    
    return {
      title,
      content: readableContent,
      fileType: 'application/json',
      fileSize: file.size
    };
  } catch (error) {
    throw new Error('Invalid JSON file');
  }
}

/**
 * Main parser function that routes to appropriate parser
 */
export async function parseDocument(file: File): Promise<ParsedDocument> {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return parsePDF(file);
  } else if (fileType === 'text/markdown' || fileName.endsWith('.md')) {
    return parseMarkdown(file);
  } else if (fileType === 'application/json' || fileName.endsWith('.json')) {
    return parseJSON(file);
  } else if (fileType.startsWith('text/') || 
             fileName.endsWith('.txt') || 
             fileName.endsWith('.csv') ||
             fileName.endsWith('.log')) {
    return parseText(file);
  } else {
    // Default to text parsing
    return parseText(file);
  }
}

/**
 * Extract title from Markdown content
 */
function extractMarkdownTitle(content: string): string | null {
  const lines = content.split('\n');
  
  // Look for H1 header (# Title)
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim();
    }
  }
  
  // Look for title in frontmatter
  if (content.startsWith('---')) {
    const frontmatterMatch = content.match(/^---\s*\n(.*?)\n---/s);
    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[1].match(/^title:\s*(.+)$/m);
      if (titleMatch) {
        return titleMatch[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  
  return null;
}

/**
 * Validate file before parsing
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'text/plain',
    'text/markdown',
    'application/pdf',
    'application/json',
    'text/csv'
  ];
  
  const allowedExtensions = ['.txt', '.md', '.pdf', '.json', '.csv', '.log'];
  const fileName = file.name.toLowerCase();
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum 10MB allowed.' };
  }
  
  if (!allowedTypes.includes(file.type) && 
      !allowedExtensions.some(ext => fileName.endsWith(ext))) {
    return { 
      valid: false, 
      error: 'Unsupported file type. Allowed: TXT, MD, PDF, JSON, CSV' 
    };
  }
  
  return { valid: true };
}
