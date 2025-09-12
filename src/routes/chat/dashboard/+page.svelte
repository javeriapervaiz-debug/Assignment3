<script lang="ts">
  import { onMount } from 'svelte';
  import ChatStats from '$lib/components/ChatStats.svelte';
  import ChatSessionManager from '$lib/components/ChatSessionManager.svelte';
  
  let sessions: any[] = [];
  let sessionsLoading = false;
  
  async function loadSessions() {
    sessionsLoading = true;
    try {
      const response = await fetch('/api/chat/sessions');
      if (response.ok) {
        const data = await response.json();
        sessions = data.sessions || [];
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      sessionsLoading = false;
    }
  }
  
  onMount(() => {
    loadSessions();
  });
</script>

<svelte:head>
  <title>Chat Dashboard - Auth App</title>
  <meta name="description" content="View your AI chat statistics and manage your chat sessions." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
  <!-- Header -->
  <div class="bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-md border-b border-green-500/50 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <a 
            href="/chat" 
            class="group flex items-center space-x-3 text-white hover:text-green-400 transition-all duration-300 hover:bg-green-500/10 px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/20"
          >
            <svg class="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-semibold">Back to Chat</span>
          </a>
          
          <div class="h-8 w-px bg-gradient-to-b from-green-500 to-emerald-500"></div>
          
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30 animate-pulse">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Chat Dashboard</h1>
              <p class="text-gray-400">Statistics & Session Management</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <a 
            href="/chat" 
            class="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
          >
            <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="font-semibold">Start New Chat</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Statistics -->
      <div class="lg:col-span-1">
        <ChatStats />
      </div>
      
      <!-- Session Management -->
      <div class="lg:col-span-2">
        <ChatSessionManager 
          {sessions}
          currentSessionId={null}
          isLoading={sessionsLoading}
        />
      </div>
    </div>
    
    <!-- Additional Info -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Features Card -->
      <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md shadow-2xl rounded-3xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 p-8">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white">Chat Features</h3>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-lg text-gray-300">Persistent chat history</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-lg text-gray-300">Session management</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-lg text-gray-300">Usage analytics</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-lg text-gray-300">Secure & private</span>
          </div>
        </div>
      </div>
      
      <!-- Tips Card -->
      <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md shadow-2xl rounded-3xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 p-8">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white">Usage Tips</h3>
        </div>
        <div class="space-y-4 text-gray-300">
          <div class="flex items-start space-x-4">
            <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-green-400/50"></div>
            <p class="text-lg">Create separate sessions for different topics to keep conversations organized</p>
          </div>
          <div class="flex items-start space-x-4">
            <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-green-400/50"></div>
            <p class="text-lg">Use descriptive titles for your chat sessions to easily find them later</p>
          </div>
          <div class="flex items-start space-x-4">
            <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-green-400/50"></div>
            <p class="text-lg">All your conversations are automatically saved and can be accessed anytime</p>
          </div>
          <div class="flex items-start space-x-4">
            <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-green-400/50"></div>
            <p class="text-lg">Monitor your usage statistics to track your AI interaction patterns</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
