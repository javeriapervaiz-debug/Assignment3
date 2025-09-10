// src/lib/server/document-parser.ts

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
 * Parse PDF files (basic implementation)
 * Note: For production, you'd want to use a proper PDF parser like pdf-parse
 */
export async function parsePDF(file: File): Promise<ParsedDocument> {
  // This is a placeholder implementation
  // In production, you'd use a library like pdf-parse or pdf2pic
  const title = file.name.replace(/\.[^/.]+$/, '');
  
  // For now, return a placeholder
  // TODO: Implement actual PDF parsing
  return {
    title,
    content: `[PDF Content - ${file.name}]\n\nThis is a placeholder for PDF content. In production, you would use a proper PDF parsing library to extract text from the PDF file.`,
    fileType: 'application/pdf',
    fileSize: file.size
  };
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
