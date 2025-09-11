<script lang="ts">
  import { onMount } from 'svelte';
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  
  // Define Message type locally since 'ai' package might not be available
  interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: any[];
    attachment?: {
      id: string;
      title: string;
      fileType: string;
      fileSize: number;
    };
  }
  
  export let message: Message;
  export let isLoading: boolean = false;
  
  let messageContent: string = '';
  let citations: any[] = [];
  
  $: isUser = message.role === 'user';
  $: isAssistant = message.role === 'assistant';
  
  // Process message content for citations
  $: {
    console.log('ChatMessage - message:', message);
    console.log('ChatMessage - message.content:', message.content, 'type:', typeof message.content);
    
    if (message.content) {
      // Check if message has citations (from RAG responses)
      if (message.citations && Array.isArray(message.citations)) {
        citations = message.citations;
        messageContent = String(message.content);
      } else {
        // Regular message processing
        citations = [];
        messageContent = String(message.content);
      }
    } else {
      messageContent = '';
      citations = [];
    }
    
    console.log('ChatMessage - messageContent:', messageContent, 'type:', typeof messageContent);
  }
  
  // Message content is now handled by MarkdownRenderer component
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
        <!-- Document Attachment Display (for user messages) -->
        {#if isUser && message.attachment}
          <div class="mb-3 p-3 bg-white/10 rounded-lg border border-white/20">
            <div class="flex items-center space-x-3">
              <!-- File Icon -->
              <div class="flex-shrink-0">
                {#if message.attachment.fileType === 'application/pdf'}
                  <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                {:else if message.attachment.fileType === 'text/plain'}
                  <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                {:else if message.attachment.fileType === 'text/markdown'}
                  <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                {:else}
                  <div class="w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                {/if}
              </div>
              
              <!-- File Info -->
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-white truncate">
                  {message.attachment.title}
                </div>
                <div class="text-xs text-white/70">
                  {message.attachment.fileType.split('/')[1].toUpperCase()} • {(message.attachment.fileSize / 1024).toFixed(1)} KB
                </div>
              </div>
              
              <!-- Attachment Badge -->
              <div class="flex-shrink-0">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  📎 Attached
                </span>
              </div>
            </div>
          </div>
        {/if}
        
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
          {#if isAssistant}
            <MarkdownRenderer content={messageContent} />
          {:else}
            <div class="text-white whitespace-pre-wrap">{messageContent}</div>
          {/if}
          
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
