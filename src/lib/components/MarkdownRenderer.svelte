<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';

  export let content: string;
  let renderedContent: string = '';

  // Function to safely extract text from token objects or strings
  function extractText(input: any): string {
    if (typeof input === 'string') {
      return input;
    }
    if (input && typeof input === 'object') {
      if (Array.isArray(input)) {
        return input.map(item => extractText(item)).join('');
      }
      if (input.text) {
        return input.text;
      }
      if (input.raw) {
        return input.raw;
      }
      if (input.tokens && Array.isArray(input.tokens)) {
        return extractText(input.tokens);
      }
    }
    return String(input);
  }

  // Custom renderer for code highlighting
  const renderer = new marked.Renderer();
  
  renderer.code = function(code, lang) {
    const codeString = extractText(code);
    const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
    const highlighted = hljs.highlight(codeString, { language }).value;
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
  };

  // Custom strong/bold rendering
  renderer.strong = function(text: any) {
    const textContent = extractText(text);
    return `<strong class="font-semibold text-gray-100">${textContent}</strong>`;
  };

  // Custom emphasis/italic rendering
  renderer.em = function(text: any) {
    const textContent = extractText(text);
    return `<em class="italic text-gray-300">${textContent}</em>`;
  };

  // Custom link rendering
  renderer.link = function(href: string, title: string, text: any) {
    const titleAttr = title ? ` title="${title}"` : '';
    const textContent = extractText(text);
    return `<a href="${href}"${titleAttr} class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">${textContent}</a>`;
  };

  // Custom horizontal rule rendering
  renderer.hr = function() {
    return '<hr class="my-6 border-gray-300">';
  };

  // Custom list rendering
  renderer.list = function(body: any, ordered: boolean) {
    const isOrdered = ordered || (typeof body === 'object' && body?.ordered);
    const tag = isOrdered ? 'ol' : 'ul';
    const className = isOrdered ? 'list-decimal list-inside' : 'list-disc list-inside';
    return `<${tag} class="${className} text-gray-100 my-3">${body}</${tag}>`;
  };

  renderer.listitem = function(text: any) {
    const textContent = extractText(text);
    return `<li class="text-gray-100 my-1">${textContent}</li>`;
  };

  // Custom table rendering
  renderer.table = function(header: string, body: string) {
    return `<div class="overflow-x-auto my-4"><table class="min-w-full border-collapse border border-gray-600">${header}${body}</table></div>`;
  };

  renderer.tablerow = function(content: any) {
    const contentText = extractText(content);
    return `<tr class="border-b border-gray-600">${contentText}</tr>`;
  };

  renderer.tablecell = function(content: any, flags: any) {
    const contentText = extractText(content);
    const tag = flags.header ? 'th' : 'td';
    const className = flags.header 
      ? 'border border-gray-600 px-4 py-2 bg-gray-700 text-gray-100 font-semibold text-left'
      : 'border border-gray-600 px-4 py-2 text-gray-100';
    return `<${tag} class="${className}">${contentText}</${tag}>`;
  };

  // Custom blockquote rendering
  renderer.blockquote = function(quote: any) {
    const quoteText = extractText(quote);
    return `<blockquote class="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-300 bg-gray-800 py-2">${quoteText}</blockquote>`;
  };

  // Configure marked for markdown rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
    renderer: renderer
  });

  function processContent(inputContent: any) {
    // Only ensure input is a string, don't strip structure
    const markdownString = typeof inputContent === 'string' ? inputContent : String(inputContent);
    
    try {
      const result = marked.parse(markdownString);
      renderedContent = typeof result === 'string' ? result : String(result);
    } catch (error) {
      console.error('MarkdownRenderer - marked error:', error);
      renderedContent = markdownString; // Fallback to raw text if parsing fails
    }
  }

  onMount(() => {
    if (content) {
      processContent(content);
    }
  });

  // Reactive statement to re-render when content changes
  $: if (content) {
    processContent(content);
  }
</script>

<div class="prose prose-sm max-w-none text-gray-100">
  {@html renderedContent}
</div>

<style>
  :global(.prose p) {
    color: #f3f4f6;
    line-height: 1.625;
    margin: 0.75rem 0;
  }
  
  :global(.prose ul) {
    color: #f3f4f6;
    margin: 0.75rem 0;
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  :global(.prose ol) {
    color: #f3f4f6;
    margin: 0.75rem 0;
    list-style-type: decimal;
    padding-left: 1.5rem;
  }
  
  :global(.prose li) {
    color: #f3f4f6;
    margin: 0.25rem 0;
  }
  
  :global(.prose table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }
  
  :global(.prose th) {
    background-color: #374151;
    color: #f3f4f6;
    font-weight: 600;
    padding: 0.75rem;
    border: 1px solid #4b5563;
    text-align: left;
  }
  
  :global(.prose td) {
    color: #f3f4f6;
    padding: 0.75rem;
    border: 1px solid #4b5563;
  }
  
  :global(.prose tr:nth-child(even)) {
    background-color: #1f2937;
  }
  
  :global(.prose tr:hover) {
    background-color: #374151;
  }
  
  :global(.prose strong) {
    font-weight: 600;
    color: #f3f4f6;
  }
  
  :global(.prose em) {
    font-style: italic;
    color: #d1d5db;
  }
  
  :global(.prose code) {
    background-color: #374151;
    color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  :global(.prose pre) {
    background-color: #1f2937;
    color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  :global(.prose pre code) {
    background-color: transparent;
    padding: 0;
  }
</style>