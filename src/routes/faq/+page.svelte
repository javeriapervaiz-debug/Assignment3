<script lang="ts">
  import { page } from '$app/stores';
  
  // FAQ data
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Register' button in the navigation menu. Fill in your email address and create a secure password. Your account will be created with 'user' role by default."
    },
    {
      question: "What is the difference between user and admin roles?",
      answer: "Users have access to the dashboard and profile management features. Admins have additional privileges including access to the admin panel, user management, and the ability to promote/demote other users."
    },
    {
      question: "How can I become an admin?",
      answer: "Only existing admins can promote users to admin status. Contact an administrator or use the create-admin script if you're setting up the system for the first time."
    },
    {
      question: "Is my password secure?",
      answer: "Yes! We use bcrypt hashing with a high salt round (12) to securely store your password. Your plain text password is never stored in our database."
    },
    {
      question: "What if I forget my password?",
      answer: "Currently, password reset functionality is not implemented. Please contact an administrator to reset your password. Future updates will include a forgot password feature."
    },
    {
      question: "Can I change my profile information?",
      answer: "Yes! Once logged in, go to your Dashboard and click on 'Profile' to update your name and other profile information."
    },
    {
      question: "How do I access the admin panel?",
      answer: "If you have admin privileges, you'll see an 'Admin Panel' button in the navigation menu when logged in. Only users with admin role can access this feature."
    },
    {
      question: "What can admins do in the admin panel?",
      answer: "Admins can view all users, see user statistics, promote users to admin status, demote admins to users, and delete user accounts. They have full user management capabilities."
    },
    {
      question: "Is my data safe?",
      answer: "Yes! We implement industry-standard security practices including secure password hashing, JWT session management, role-based access control, and use PostgreSQL for reliable data storage."
    },
    {
      question: "What technologies power this platform?",
      answer: "Our platform is built with SvelteKit for the frontend and backend, Drizzle ORM for type-safe database operations, PostgreSQL for data storage, Auth.js for authentication, and TypeScript for type safety."
    },
    {
      question: "Can I view the database directly?",
      answer: "Admins can use Drizzle Studio (accessible via npm run db:studio) to view and manage the database with a web-based interface. This is more user-friendly than traditional database tools."
    },
    {
      question: "How do I log out?",
      answer: "Click the 'Sign Out' button in the navigation menu when you're logged in. This will end your session and redirect you to the login page."
    },
    {
      question: "Can multiple people use admin accounts?",
      answer: "Yes, you can have multiple admin users. Each admin has the same privileges and can manage other users, including promoting new admins or demoting existing ones."
    },
    {
      question: "What happens if I delete a user account?",
      answer: "Deleting a user account permanently removes all their data from the system. This action cannot be undone, so please use this feature carefully."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, we only offer a web-based platform. However, our responsive design works great on mobile devices and tablets through your web browser."
    }
  ];
  
  let openIndex: number | null = null;
  
  function toggleFAQ(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<svelte:head>
  <title>Frequently Asked Questions - Auth App</title>
  <meta name="description" content="Find answers to common questions about our authentication platform, user management, and security features." />
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <!-- Main Title with Gradient -->
          <h1 class="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
            Frequently Asked Questions
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-3xl max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
            Get answers to <span class="text-green-400 font-semibold">common questions</span> about our authentication platform
          </p>
          
          <!-- Stats Row -->
          <div class="flex flex-wrap justify-center gap-8 mt-12">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-400">14</div>
              <div class="text-gray-400">Questions</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-emerald-400">24/7</div>
              <div class="text-gray-400">Support</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-300">100%</div>
              <div class="text-gray-400">Helpful</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FAQs Content -->
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <!-- Quick Links -->
    <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-500/30 p-8 mb-16 hover:border-green-400/50 transition-all duration-300">
      <div class="flex items-center mb-8">
        <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white">Quick Navigation</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="#getting-started" class="group flex items-center p-4 bg-gray-800/50 hover:bg-green-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-green-500/30">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
            <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="text-gray-300 group-hover:text-green-400 font-medium transition-colors duration-300">Getting Started</span>
        </a>
        <a href="#account-management" class="group flex items-center p-4 bg-gray-800/50 hover:bg-green-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-green-500/30">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
            <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span class="text-gray-300 group-hover:text-green-400 font-medium transition-colors duration-300">Account Management</span>
        </a>
        <a href="#admin-features" class="group flex items-center p-4 bg-gray-800/50 hover:bg-green-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-green-500/30">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
            <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span class="text-gray-300 group-hover:text-green-400 font-medium transition-colors duration-300">Admin Features</span>
        </a>
        <a href="#security" class="group flex items-center p-4 bg-gray-800/50 hover:bg-green-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-green-500/30">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
            <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span class="text-gray-300 group-hover:text-green-400 font-medium transition-colors duration-300">Security</span>
        </a>
        <a href="#technical" class="group flex items-center p-4 bg-gray-800/50 hover:bg-green-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-green-500/30">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
            <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span class="text-gray-300 group-hover:text-green-400 font-medium transition-colors duration-300">Technical</span>
        </a>
        <a href="/contact" class="group flex items-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 rounded-xl transition-all duration-300 border border-green-500/30 hover:border-green-400/50">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
            <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-green-400 font-medium">Still have questions?</span>
        </a>
      </div>
    </div>

    <!-- FAQ Items -->
    <div class="space-y-6">
      {#each faqs as faq, index}
        <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group">
          <button 
            class="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-green-500/5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset rounded-2xl transition-all duration-300 group"
            on:click={() => toggleFAQ(index)}
          >
            <div class="flex items-start space-x-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300 pr-4 leading-relaxed">{faq.question}</h3>
            </div>
            <div class="flex-shrink-0">
              <svg 
                class="h-6 w-6 text-gray-400 group-hover:text-green-400 transform transition-all duration-300 {openIndex === index ? 'rotate-180' : ''}"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {#if openIndex === index}
            <div class="px-8 pb-6">
              <div class="ml-14">
                <div class="w-full h-px bg-gradient-to-r from-green-500/30 to-emerald-500/30 mb-4"></div>
                <p class="text-lg text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Help Section -->
    <div class="mt-20 relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
      
      <!-- Help Content -->
      <div class="relative bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-md text-white rounded-3xl p-16 shadow-2xl border border-green-500/30">
        <div class="text-center">
          <div class="flex items-center justify-center mb-8">
            <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
            <h2 class="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Still Have Questions?
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full ml-4"></div>
          </div>
          
          <div class="w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <p class="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Can't find what you're looking for? <span class="text-green-400 font-semibold">We're here to help!</span>
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="/contact" 
              class="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105 border border-green-500/30 hover:border-green-400/50"
            >
              <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
            
            <a 
              href="/about" 
              class="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-gray-500/30 transform hover:scale-105 border border-gray-600/30 hover:border-gray-500/50"
            >
              <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Tips -->
    <div class="mt-20">
      <div class="text-center mb-12">
        <div class="flex items-center justify-center mb-6">
          <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
          <h2 class="text-4xl font-bold text-white">Quick Tips</h2>
          <div class="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full ml-4"></div>
        </div>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          Essential tips to make the most of our platform
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-500/30 p-8 hover:border-emerald-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
            <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">Use Strong Passwords</h3>
          <p class="text-gray-300 leading-relaxed">Create passwords with at least 6 characters including numbers and special characters for maximum security.</p>
        </div>
        
        <div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
            <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">Keep Profile Updated</h3>
          <p class="text-gray-300 leading-relaxed">Regularly update your profile information to ensure account security and better user experience.</p>
        </div>
        
        <div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/30 p-8 hover:border-purple-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
            <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">Remember to Logout</h3>
          <p class="text-gray-300 leading-relaxed">Always sign out when using shared or public computers to protect your account from unauthorized access.</p>
        </div>
      </div>
    </div>
  </div>
</div>
