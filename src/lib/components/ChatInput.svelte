<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let disabled: boolean = false;
  export let placeholder: string = 'Type your message...';
  
  const dispatch = createEventDispatcher();
  
  let message = '';
  let textareaElement: HTMLTextAreaElement;
  let fileInputElement: HTMLInputElement;
  let isUploading = false;
  let uploadProgress = 0;
  let showUploadArea = false;
  let uploadedDocument: any = null; // Store uploaded document info
  
  function handleSubmit() {
    if (message.trim() && !disabled) {
      dispatch('send', { 
        message: message.trim(),
        attachment: uploadedDocument // Include the uploaded document with the message
      });
      message = '';
      uploadedDocument = null; // Clear uploaded document after sending
      // Reset textarea height
      if (textareaElement) {
        textareaElement.style.height = 'auto';
      }
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
  
  function adjustTextareaHeight() {
    if (textareaElement) {
      textareaElement.style.height = 'auto';
      textareaElement.style.height = Math.min(textareaElement.scrollHeight, 120) + 'px';
    }
  }
  
  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/json',
      'text/csv',
      'text/html'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a supported file type: TXT, MD, PDF, JSON, CSV, or HTML');
      return;
    }
    
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }
    
    isUploading = true;
    uploadProgress = 0;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const result = await response.json();
      
      if (result.success && result.document) {
        // Store the uploaded document info for the user to reference
        uploadedDocument = result.document;
        
        // Show success feedback but don't auto-send message
        // User can now write their own message about the document
        console.log('Document uploaded successfully:', result.document);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
      
      // Reset file input
      if (fileInputElement) {
        fileInputElement.value = '';
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      isUploading = false;
      uploadProgress = 0;
      showUploadArea = false;
    }
  }
  
  function triggerFileUpload() {
    if (fileInputElement) {
      fileInputElement.click();
    }
  }
  
  function toggleUploadArea() {
    showUploadArea = !showUploadArea;
  }
  
  $: if (message) {
    adjustTextareaHeight();
  }
</script>

<div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
  <!-- File Upload Area -->
  {#if showUploadArea}
    <div class="mb-4 p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-medium text-white">Upload Document</h3>
        <button
          type="button"
          on:click={toggleUploadArea}
          class="text-gray-400 hover:text-white transition-colors"
          aria-label="Close upload area"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-center space-x-3">
          <input
            bind:this={fileInputElement}
            type="file"
            on:change={handleFileUpload}
            accept=".txt,.md,.pdf,.json,.csv,.html"
            class="hidden"
          />
          <button
            type="button"
            on:click={triggerFileUpload}
            disabled={isUploading}
            class="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span class="text-sm">Choose File</span>
          </button>
          
          <div class="text-xs text-gray-400">
            Supports: TXT, MD, PDF, JSON, CSV, HTML (max 10MB)
          </div>
        </div>
        
        {#if isUploading}
          <div class="space-y-2">
            <div class="flex items-center space-x-2 text-sm text-emerald-400">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Processing document...</span>
            </div>
            <div class="w-full bg-slate-600 rounded-full h-2">
              <div 
                class="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style="width: {uploadProgress}%"
              ></div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Uploaded Document Indicator -->
  {#if uploadedDocument}
    <div class="mb-3 p-3 bg-emerald-600/20 border border-emerald-500/30 rounded-lg">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm text-emerald-300">
          Document "{uploadedDocument.title}" uploaded successfully! You can now ask questions about it.
        </span>
        <button
          type="button"
          on:click={() => uploadedDocument = null}
          class="ml-auto text-emerald-400 hover:text-emerald-300 transition-colors"
          aria-label="Dismiss"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="flex items-end space-x-3">
    <!-- Text Input -->
    <div class="flex-1 relative">
      <textarea
        bind:this={textareaElement}
        bind:value={message}
        on:keydown={handleKeydown}
        on:input={adjustTextareaHeight}
        {disabled}
        {placeholder}
        class="
          w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl
          text-white placeholder-gray-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          backdrop-blur-sm transition-all duration-200
        "
        rows="1"
        maxlength="2000"
      ></textarea>
      
      <!-- Character Count -->
      <div class="absolute bottom-2 right-2 text-xs text-gray-400">
        {message.length}/2000
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex items-center space-x-2">
      <!-- Upload Button -->
      <button
        type="button"
        on:click={toggleUploadArea}
        disabled={disabled || isUploading}
        class="
          flex-shrink-0 w-12 h-12 bg-slate-600 hover:bg-slate-500
          text-white rounded-xl flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
        title="Upload Document"
        aria-label="Upload Document"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </button>
      
      <!-- Send Button -->
      <button
        type="submit"
        {disabled}
        class="
          flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600
          text-white rounded-xl flex items-center justify-center
          hover:from-purple-700 hover:to-pink-700
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 shadow-lg
        "
      >
        {#if disabled}
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        {/if}
      </button>
    </div>
  </form>
  
  <!-- Quick Actions -->
  <div class="mt-3 flex flex-wrap gap-2">
    <button
      type="button"
      on:click={() => dispatch('quick-action', { action: 'help' })}
      class="px-3 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200"
    >
      Need Help?
    </button>
    <button
      type="button"
      on:click={() => dispatch('quick-action', { action: 'features' })}
      class="px-3 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200"
    >
      Platform Features
    </button>
    <button
      type="button"
      on:click={() => dispatch('quick-action', { action: 'security' })}
      class="px-3 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200"
    >
      Security Tips
    </button>
    <button
      type="button"
      on:click={toggleUploadArea}
      class="px-3 py-1 text-xs bg-purple-600/50 text-purple-300 rounded-lg hover:bg-purple-600/70 transition-colors duration-200"
    >
      📄 Upload Document
    </button>
  </div>
</div>
