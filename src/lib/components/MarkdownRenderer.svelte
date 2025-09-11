<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';

  export let content: string = '';
  export let citations: Array<{id: string, title: string, url?: string, chunk?: string}> = [];

  let renderedContent = '';

  // Configure marked with syntax highlighting
  const renderer = new marked.Renderer();
  
  // Custom code block renderer with syntax highlighting
  renderer.code = function({ text, lang }: { text: string; lang?: string }) {
    const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
    const highlighted = hljs.highlight(text, { language: validLanguage }).value;
    
    return `
      <div class="relative">
        <div class="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-lg border-b border-slate-600">
          <span class="text-xs font-medium text-gray-300 uppercase tracking-wide">${validLanguage}</span>
          <button 
            class="copy-code-btn text-xs text-gray-400 hover:text-white transition-colors duration-200"
            data-code="${encodeURIComponent(text)}"
          >
            Copy
          </button>
        </div>
        <pre class="bg-slate-900 rounded-b-lg overflow-x-auto"><code class="language-${validLanguage} hljs">${highlighted}</code></pre>
      </div>
    `;
  };

  // Custom blockquote renderer for citations
  renderer.blockquote = function({ tokens }: { tokens: any[] }) {
    const quote = tokens.map(token => token.raw).join('');
    return `
      <blockquote class="border-l-4 border-blue-500 bg-blue-500/5 pl-4 py-2 my-4 rounded-r-lg">
        <div class="text-gray-200">${quote}</div>
      </blockquote>
    `;
  };

  // Custom link renderer
  renderer.link = function({ href, title, tokens }: { href: string; title?: string | null; tokens: any[] }) {
    const text = tokens.map(token => token.raw).join('');
    const isExternal = href.startsWith('http');
    const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = title ? `title="${title}"` : '';
    
    return `<a href="${href}" ${target} ${titleAttr} class="text-blue-400 hover:text-blue-300 underline transition-colors duration-200">${text}</a>`;
  };

  // Custom table renderer
  renderer.table = function(token: any) {
    const header = token.header ? token.header.map((cell: any) => renderer.tablecell(cell)).join('') : '';
    const body = token.rows ? token.rows.map((row: any) => 
      `<tr class="hover:bg-slate-800/50 transition-colors duration-200">${row.map((cell: any) => renderer.tablecell(cell)).join('')}</tr>`
    ).join('') : '';
    
    return `
      <div class="overflow-x-auto my-4">
        <table class="min-w-full border-collapse border border-slate-600 rounded-lg overflow-hidden">
          <thead class="bg-slate-800">
            <tr class="border-b border-slate-600">
              ${header}
            </tr>
          </thead>
          <tbody class="bg-slate-900">
            ${body}
          </tbody>
        </table>
      </div>
    `;
  };

  renderer.tablerow = function({ text }: { text: string }) {
    return `<tr class="hover:bg-slate-800/50 transition-colors duration-200">${text}</tr>`;
  };

  renderer.tablecell = function(token: any) {
    const tag = token.header ? 'th' : 'td';
    const align = token.align ? `text-${token.align}` : '';
    const classes = token.header 
      ? `px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border border-slate-600 ${align}`
      : `px-4 py-3 text-sm text-gray-200 border border-slate-600 ${align}`;
    
    // Remove markdown bold formatting (**text**)
    const cleanText = token.text.replace(/\*\*(.*?)\*\*/g, '$1');
    
    return `<${tag} class="${classes}">${cleanText}</${tag}>`;
  };

  // Custom strong renderer to remove ** formatting
  renderer.strong = function({ text }: { text: string }) {
    return `<strong class="font-semibold text-white">${text}</strong>`;
  };

  // Configure marked options
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true,
    pedantic: false
  });

  // Process content and citations
  function processContent() {
    // Process only the markdown content
    const result = marked(content);
    renderedContent = typeof result === 'string' ? result : result.toString();
  }

  // Handle copy code functionality
  function handleCopyCode(event: Event) {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    
    const button = event.target as HTMLButtonElement;
    const code = decodeURIComponent(button.dataset.code || '');
    
    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('text-green-400');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('text-green-400');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }

  onMount(() => {
    processContent();
    
    // Add event listeners for copy buttons (only in browser)
    if (typeof document !== 'undefined') {
      const copyButtons = document.querySelectorAll('.copy-code-btn');
      copyButtons.forEach(button => {
        button.addEventListener('click', handleCopyCode);
      });
    }
  });

  // Re-process when content or citations change
  $: if (content || citations) {
    processContent();
    
    // Re-add event listeners after content update (only in browser)
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const copyButtons = document.querySelectorAll('.copy-code-btn');
        copyButtons.forEach(button => {
          button.addEventListener('click', handleCopyCode);
        });
      }, 0);
    }
  }
</script>

<div class="markdown-content prose prose-invert max-w-none">
  {@html renderedContent}
</div>

<!-- Citations Section -->
{#if citations.length > 0}
  <div class="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
    <h4 class="text-sm font-semibold text-gray-300 mb-3 flex items-center">
      <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Sources
    </h4>
    <div class="space-y-2">
      {#each citations as citation, index}
        <div class="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
          <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center justify-center">{index + 1}</span>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-white">{citation.title}</div>
            {#if citation.url}
              <div class="text-xs text-blue-400 mt-1">{citation.url}</div>
            {/if}
            {#if citation.chunk}
              <div class="text-xs text-gray-400 mt-2 line-clamp-2">{citation.chunk}</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  :global(.markdown-content) {
    color: #e2e8f0;
  }
  
  :global(.markdown-content h1) {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
  }
  
  :global(.markdown-content h2) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.75rem;
    margin-top: 1.25rem;
  }
  
  :global(.markdown-content h3) {
    font-size: 1.125rem;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
  
  :global(.markdown-content h4) {
    font-size: 1rem;
    font-weight: 500;
    color: #e2e8f0;
    margin-bottom: 0.5rem;
    margin-top: 0.75rem;
  }
  
  :global(.markdown-content p) {
    color: #e2e8f0;
    margin-bottom: 1rem;
    line-height: 1.625;
  }
  
  :global(.markdown-content ul) {
    list-style-type: disc;
    list-style-position: inside;
    margin-bottom: 1rem;
  }
  
  :global(.markdown-content ul li) {
    margin-bottom: 0.25rem;
  }
  
  :global(.markdown-content ol) {
    list-style-type: decimal;
    list-style-position: inside;
    margin-bottom: 1rem;
  }
  
  :global(.markdown-content ol li) {
    margin-bottom: 0.25rem;
  }
  
  :global(.markdown-content li) {
    color: #e2e8f0;
  }
  
  :global(.markdown-content strong) {
    font-weight: 600;
    color: #ffffff;
  }
  
  :global(.markdown-content em) {
    font-style: italic;
    color: #d1d5db;
  }
  
  :global(.markdown-content code:not(.hljs)) {
    background-color: #334155;
    color: #93c5fd;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  }
  
  :global(.markdown-content pre) {
    margin: 1rem 0;
  }
  
  :global(.markdown-content hr) {
    border-color: #475569;
    margin: 1.5rem 0;
  }
  
  :global(.markdown-content table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }
  
  :global(.markdown-content th) {
    border: 1px solid #475569;
    padding: 0.75rem 1rem;
    text-align: left;
    background-color: #1e293b;
    font-weight: 600;
    color: #d1d5db;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
  
  :global(.markdown-content td) {
    border: 1px solid #475569;
    padding: 0.75rem 1rem;
    color: #e2e8f0;
    font-size: 0.875rem;
  }
  
  :global(.markdown-content tr:hover) {
    background-color: rgba(30, 41, 59, 0.5);
  }
  
  :global(.markdown-content blockquote) {
    border-left: 4px solid #3b82f6;
    background-color: rgba(59, 130, 246, 0.05);
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  :global(.markdown-content blockquote p) {
    margin-bottom: 0;
    color: #e2e8f0;
  }
  
  /* Syntax highlighting overrides for dark theme */
  :global(.hljs) {
    background-color: #0f172a;
    color: #f1f5f9;
  }
  
  :global(.line-clamp-2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
