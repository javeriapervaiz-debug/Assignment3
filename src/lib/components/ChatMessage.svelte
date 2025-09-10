<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  
  // Define Message type locally since 'ai' package might not be available
  interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: any[];
  }
  
  export let message: Message;
  export let isLoading: boolean = false;
  
  let messageContent: string = '';
  let citations: any[] = [];
  
  $: isUser = message.role === 'user';
  $: isAssistant = message.role === 'assistant';
  
  // Configure marked for markdown rendering
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  // Custom renderer for code highlighting
  const renderer = new marked.Renderer();
  renderer.code = function({ text, lang }: { text: string; lang?: string }) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${hljs.highlight(text, { language: lang }).value}</code></pre>`;
      } catch (err) {
        console.error('Highlight error:', err);
      }
    }
    return `<pre><code class="hljs">${hljs.highlightAuto(text).value}</code></pre>`;
  };
  
  marked.use({ renderer });
  
  // Process message content for citations and markdown
  $: {
    if (message.content) {
      // Check if message has citations (from RAG responses)
      if (message.citations && Array.isArray(message.citations)) {
        citations = message.citations;
        messageContent = message.content;
      } else {
        // Regular message processing
        citations = [];
        messageContent = message.content;
      }
    }
  }
  
  // Render markdown to HTML
  $: renderedContent = isAssistant ? marked(messageContent) : messageContent;
  
  onMount(() => {
    // Initialize highlight.js for code blocks
    hljs.highlightAll();
  });
</script>

<div class="flex {isUser ? 'justify-end' : 'justify-start'} mb-6">
  <div class="flex max-w-[80%] {isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      {#if isUser}
        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      {:else if isAssistant}
        <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      {/if}
    </div>
    
    <!-- Message Content -->
    <div class="flex flex-col {isUser ? 'items-end' : 'items-start'}">
      <!-- Message Bubble -->
      <div class="
        px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm
        {isUser 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
          : 'bg-slate-800/50 border border-slate-700/50 text-gray-100'
        }
        {isLoading ? 'animate-pulse' : ''}
      ">
        {#if isLoading && isAssistant}
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
            <span class="text-sm text-gray-400">AI is thinking...</span>
          </div>
        {:else}
          <div class="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-100 prose-strong:text-white prose-code:text-pink-300 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-700">
            {@html renderedContent}
          </div>
          
          <!-- Citations -->
          {#if citations && citations.length > 0}
            <div class="mt-3 pt-3 border-t border-slate-600/50">
              <div class="text-xs text-gray-400 mb-2 font-medium">Sources:</div>
              <div class="space-y-2">
                {#each citations as citation, index}
                  <div class="flex items-start space-x-2 text-xs">
                    <span class="flex-shrink-0 w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <div class="flex-1 min-w-0">
                      <div class="text-gray-300 font-medium truncate">
                        {citation.title || 'Untitled Document'}
                      </div>
                      {#if citation.sourceUrl}
                        <a 
                          href={citation.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="text-purple-400 hover:text-purple-300 transition-colors truncate block"
                        >
                          {citation.sourceUrl}
                        </a>
                      {/if}
                      <div class="text-gray-500 mt-1 line-clamp-2">
                        {citation.content}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {/if}
      </div>
      
      <!-- Timestamp -->
      <div class="mt-1 text-xs text-gray-400 px-2">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  </div>
</div>

<style>
  :global(.prose pre) {
    background: rgba(15, 23, 42, 0.8) !important;
    border: 1px solid rgba(71, 85, 105, 0.5) !important;
  }
  
  :global(.prose code) {
    background: rgba(139, 92, 246, 0.1) !important;
    padding: 0.125rem 0.25rem !important;
    border-radius: 0.25rem !important;
  }
  
  :global(.prose pre code) {
    background: transparent !important;
    padding: 0 !important;
  }
  
  :global(.line-clamp-2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
