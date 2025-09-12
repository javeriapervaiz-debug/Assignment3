<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import SimpleChatContainer from '$lib/components/SimpleChatContainer.svelte';
  
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
  
  let chatContainer: HTMLDivElement;
  
  // Initialize with a welcome message
  const initialMessages: Message[] = [
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your AI assistant for the authentication platform. I can help you with:

• **Platform Features** - Learn about user management, admin controls, and security features
• **Technical Support** - Troubleshoot login issues, account problems, and system questions  
• **Security Guidance** - Best practices for passwords, account security, and data protection
• **General Questions** - How to use specific features or navigate the platform

What would you like to know? Feel free to ask me anything! 🚀`
    }
  ];
  
  onMount(() => {
    // Set page title
    document.title = 'AI Chat - Auth App';
  });
</script>

<svelte:head>
  <title>AI Chat Assistant - Auth App</title>
  <meta name="description" content="Get instant help from our AI assistant. Ask questions about the platform, get technical support, or learn about security best practices." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
  <!-- Header -->
  <div class="bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-md border-b border-green-500/50 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <a 
            href="/" 
            class="flex items-center space-x-2 text-white hover:text-green-400 transition-all duration-300 hover:bg-green-500/10 px-3 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/20"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-medium">Back to Dashboard</span>
          </a>
          
          <div class="h-6 w-px bg-gradient-to-b from-green-500 to-emerald-500"></div>
          
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-white">AI Chat Assistant</h1>
              <p class="text-sm text-gray-400">Powered by Gemini AI</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Status Indicator -->
          <div class="flex items-center space-x-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
            <span class="text-sm font-medium">AI Online</span>
          </div>
          
          <!-- Help Button -->
          <a 
            href="/faq" 
            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-gray-700/70 hover:to-gray-600/70 text-gray-300 hover:text-green-400 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 border border-gray-600/30 hover:border-green-500/30"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm">FAQ</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Chat Container -->
  <div class="max-w-7xl mx-auto h-[calc(100vh-80px)]">
    <div bind:this={chatContainer} class="h-full">
      <SimpleChatContainer {initialMessages} showSessionManager={true} />
    </div>
  </div>
  
  <!-- Footer Info -->
  <div class="bg-gradient-to-r from-gray-900/40 via-black/30 to-gray-900/40 backdrop-blur-md border-t border-green-500/40 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between text-sm text-gray-400">
        <div class="flex items-center space-x-4">
          <span>💡 Tip: Ask about platform features, security, or technical support</span>
        </div>
        <div class="flex items-center space-x-4">
          <span>Powered by Gemini AI</span>
          <span>•</span>
          <span>Secure & Private</span>
          <span>•</span>
          <span>Messages Saved to Database</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar for chat messages */
  :global(.chat-messages) {
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  }
  
  :global(.chat-messages::-webkit-scrollbar) {
    width: 6px;
  }
  
  :global(.chat-messages::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(.chat-messages::-webkit-scrollbar-thumb) {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
  }
  
  :global(.chat-messages::-webkit-scrollbar-thumb:hover) {
    background: rgba(139, 92, 246, 0.5);
  }
</style>
