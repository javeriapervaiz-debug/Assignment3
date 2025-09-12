<script>
  import { page } from '$app/stores';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let isSubmitting = false;
  let submitMessage = '';
  
  function handleSubmit() {
    isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      isSubmitting = false;
      submitMessage = 'Thank you for your message! We\'ll get back to you soon.';
      formData = { name: '', email: '', subject: '', message: '' };
      
      // Clear message after 5 seconds
      setTimeout(() => {
        submitMessage = '';
      }, 5000);
    }, 1000);
  }
</script>

<svelte:head>
  <title>Contact Us - Auth App</title>
  <meta name="description" content="Get in touch with our team. Contact us for support, questions, or feedback about our authentication platform." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
  <!-- Hero Section -->
  <div class="relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
    
    <!-- Hero Content -->
    <div class="relative bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-md py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Animated Icon -->
          <div class="mx-auto h-24 w-24 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30 animate-pulse">
            <svg class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <!-- Main Title with Gradient -->
          <h1 class="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
            Contact Us
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-3xl max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
            We're here to <span class="text-green-400 font-semibold">help</span>! Get in touch with our team
          </p>
          
          <!-- Stats Row -->
          <div class="flex flex-wrap justify-center gap-8 mt-12">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-400">24/7</div>
              <div class="text-gray-400">Support</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-emerald-400">Fast</div>
              <div class="text-gray-400">Response</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-300">Expert</div>
              <div class="text-gray-400">Team</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Contact Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Contact Information -->
      <div class="space-y-10">
        <div>
          <div class="flex items-center mb-8">
            <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
            <h2 class="text-4xl font-bold text-white">Get In Touch</h2>
          </div>
          <p class="text-xl text-gray-300 mb-8 leading-relaxed">
            Have questions about our platform? Need support? Want to provide feedback? 
            We'd love to hear from you! Reach out using any of the methods below.
          </p>
        </div>

        <!-- Contact Methods -->
        <div class="space-y-8">
          <!-- Phone -->
          <div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-500/30 p-6 hover:border-emerald-400/50 transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-2">Phone Support</h3>
                <p class="text-gray-300 mb-3">Call us for immediate assistance</p>
                <a href="tel:0300-000000" class="text-emerald-400 hover:text-emerald-300 font-bold text-xl transition-colors duration-300">
                  0300-000000
                </a>
                <p class="text-sm text-gray-400 mt-2">Available Monday - Friday, 9 AM - 6 PM</p>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">Email Support</h3>
                <p class="text-gray-300 mb-3">Send us an email anytime</p>
                <a href="mailto:vanar@bigimmersive.com" class="text-blue-400 hover:text-blue-300 font-bold text-lg transition-colors duration-300">
                  vanar@bigimmersive.com
                </a>
                <p class="text-sm text-gray-400 mt-2">We typically respond within 24 hours</p>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/30 p-6 hover:border-purple-400/50 transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">Office Location</h3>
                <p class="text-gray-300 mb-3">Visit us during business hours</p>
                <p class="text-gray-200 font-medium">Big Immersive<br>Authentication Solutions</p>
                <p class="text-sm text-gray-400 mt-2">Monday - Friday, 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Categories -->
        <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-300">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">How Can We Help?</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Technical Support</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Account Issues</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Feature Requests</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300 group-hover:text-white transition-colors duration-300">General Inquiries</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Admin Training</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Security Questions</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-500/30 p-10 hover:border-green-400/50 transition-all duration-300">
        <div class="flex items-center mb-8">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white">Send Us a Message</h2>
        </div>
        
        {#if submitMessage}
          <div class="mb-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl backdrop-blur-sm">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-green-300 text-lg font-medium">{submitMessage}</p>
            </div>
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-8">
          <div>
            <label for="name" class="block text-lg font-semibold text-gray-300 mb-3">
              Full Name *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                required
                class="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm text-lg transition-all duration-300 hover:border-green-500/50"
                placeholder="Your full name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-lg font-semibold text-gray-300 mb-3">
              Email Address *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                class="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm text-lg transition-all duration-300 hover:border-green-500/50"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label for="subject" class="block text-lg font-semibold text-gray-300 mb-3">
              Subject *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <select
                id="subject"
                bind:value={formData.subject}
                required
                class="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm appearance-none text-lg transition-all duration-300 hover:border-green-500/50"
              >
                <option value="">Select a subject</option>
                <option value="technical-support">Technical Support</option>
                <option value="account-issues">Account Issues</option>
                <option value="feature-request">Feature Request</option>
                <option value="admin-training">Admin Training</option>
                <option value="security">Security Questions</option>
                <option value="general">General Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label for="message" class="block text-lg font-semibold text-gray-300 mb-3">
              Message *
            </label>
            <div class="relative">
              <div class="absolute top-4 left-4 flex items-start pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="6"
                class="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm resize-none text-lg transition-all duration-300 hover:border-green-500/50"
                placeholder="Please describe your question or issue in detail..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-green-600/30">
          <p class="text-sm text-gray-400 text-center">
            * Required fields. We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ Link -->
    <div class="mt-20 relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
      
      <!-- FAQ Content -->
      <div class="relative bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-md text-white rounded-3xl p-16 shadow-2xl border border-green-500/30">
        <div class="text-center">
          <div class="flex items-center justify-center mb-8">
            <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Before You Contact Us
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full ml-4"></div>
          </div>
          
          <div class="w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <p class="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Check out our <span class="text-green-400 font-semibold">FAQ section</span> for quick answers to common questions.
          </p>
          
          <a 
            href="/faq" 
            class="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105 border border-green-500/30 hover:border-green-400/50"
          >
            <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View FAQ
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
