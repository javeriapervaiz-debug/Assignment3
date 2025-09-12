<script lang="ts">
  // Define Message type locally since we're not using the ai package
  interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    attachment?: {
      id: string;
      title: string;
      fileType: string;
      fileSize: number;
    };
    citations?: Array<{id: string, title: string, url?: string, chunk?: string}>;
    isStreaming?: boolean;
  }
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  
  export let message: Message;
  export let isLoading: boolean = false;
  export let citations: Array<{id: string, title: string, url?: string, chunk?: string}> = [];
  
  $: isUser = message.role === 'user';
  $: isAssistant = message.role === 'assistant';
  $: messageCitations = message.citations || citations || [];
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
        {#if isLoading && isAssistant && !message.isStreaming}
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
            <span class="text-sm text-gray-400">AI is thinking...</span>
          </div>
        {:else if isAssistant && message.isStreaming}
          <div class="space-y-2">
            <MarkdownRenderer content={message.content} citations={messageCitations} />
            <div class="flex items-center space-x-2 text-emerald-400">
              <div class="flex space-x-1">
                <div class="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                <div class="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
              </div>
              <span class="text-xs">AI is typing...</span>
            </div>
          </div>
        {:else}
          {#if isAssistant}
            <MarkdownRenderer content={message.content} citations={messageCitations} />
          {:else}
            <div class="text-gray-200 whitespace-pre-wrap">{message.content}</div>
          {/if}
        {/if}
        
        <!-- Attachment Indicator for User Messages -->
        {#if isUser && message.attachment}
          <div class="mt-3 pt-3 border-t border-purple-500/20">
            <div class="flex items-center space-x-2 text-purple-300">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{message.attachment.title}</p>
                <p class="text-xs text-purple-400">
                  {message.attachment.fileType.toUpperCase()} • {(message.attachment.fileSize / 1024).toFixed(1)} KB
                </p>
              </div>
              <div class="flex-shrink-0">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                  Attached
                </span>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Timestamp -->
      <div class="mt-1 text-xs text-gray-400 px-2">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  </div>
</div>
