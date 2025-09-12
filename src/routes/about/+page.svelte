<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>About Us - Auth App</title>
  <meta name="description" content="Learn more about our secure authentication platform and our mission to provide reliable user management solutions." />
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          
          <!-- Main Title with Gradient -->
          <h1 class="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
            About Our Platform
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-3xl max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
            Building <span class="text-green-400 font-semibold">secure</span>, <span class="text-emerald-400 font-semibold">scalable</span> authentication solutions for modern applications
          </p>
          
          <!-- Stats Row -->
          <div class="flex flex-wrap justify-center gap-8 mt-12">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-400">100%</div>
              <div class="text-gray-400">Secure</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-emerald-400">24/7</div>
              <div class="text-gray-400">Available</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-300">Modern</div>
              <div class="text-gray-400">Technology</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <!-- Mission Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
      <div class="space-y-6">
        <div class="flex items-center mb-8">
          <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
          <h2 class="text-4xl font-bold text-white">Our Mission</h2>
        </div>
        <p class="text-xl text-gray-300 leading-relaxed">
          We are dedicated to providing <span class="text-green-400 font-semibold">secure</span>, user-friendly authentication solutions that protect your data while delivering seamless user experiences.
        </p>
        <p class="text-xl text-gray-300 leading-relaxed">
          Our platform combines cutting-edge security practices with intuitive design, ensuring that both users and administrators can manage authentication with confidence.
        </p>
        <p class="text-xl text-gray-300 leading-relaxed">
          Built with modern technologies like <span class="text-emerald-400 font-semibold">SvelteKit</span>, <span class="text-green-400 font-semibold">Drizzle ORM</span>, and <span class="text-emerald-300 font-semibold">PostgreSQL</span>, our solution is designed for scalability and performance.
        </p>
      </div>
      
      <!-- Features Card -->
      <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-300">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white">Key Features</h3>
        </div>
        <ul class="space-y-4">
          <li class="flex items-center group">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Secure password authentication</span>
          </li>
          <li class="flex items-center group">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Role-based access control</span>
          </li>
          <li class="flex items-center group">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Admin user management</span>
          </li>
          <li class="flex items-center group">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Database management with Drizzle Studio</span>
          </li>
          <li class="flex items-center group">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Modern, responsive design</span>
          </li>
          <li class="flex items-center group">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors duration-300">Type-safe development with TypeScript</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Technology Stack -->
    <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-500/30 p-12 mb-20 hover:border-green-400/50 transition-all duration-300">
      <div class="text-center mb-12">
        <div class="flex items-center justify-center mb-6">
          <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
          <h2 class="text-4xl font-bold text-white">Built With Modern Technology</h2>
          <div class="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full ml-4"></div>
        </div>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          Powered by cutting-edge technologies for maximum performance and security
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center group">
          <div class="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
            <span class="text-3xl font-bold text-white">S</span>
          </div>
          <h3 class="font-bold text-white text-lg mb-2 group-hover:text-orange-400 transition-colors duration-300">SvelteKit</h3>
          <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Full-stack framework</p>
        </div>
        
        <div class="text-center group">
          <div class="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
            <span class="text-3xl font-bold text-white">D</span>
          </div>
          <h3 class="font-bold text-white text-lg mb-2 group-hover:text-emerald-400 transition-colors duration-300">Drizzle ORM</h3>
          <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Type-safe database</p>
        </div>
        
        <div class="text-center group">
          <div class="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
            <span class="text-3xl font-bold text-white">P</span>
          </div>
          <h3 class="font-bold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors duration-300">PostgreSQL</h3>
          <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Reliable database</p>
        </div>
        
        <div class="text-center group">
          <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
            <span class="text-3xl font-bold text-white">A</span>
          </div>
          <h3 class="font-bold text-white text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300">Auth.js</h3>
          <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Authentication library</p>
        </div>
      </div>
    </div>

    <!-- Security & Performance Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
      <!-- Security Card -->
      <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-red-500/30 p-8 hover:border-red-400/50 transition-all duration-300 group">
        <div class="flex items-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-300">
            <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">Security First</h3>
            <div class="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-2"></div>
          </div>
        </div>
        <p class="text-lg text-gray-300 mb-6 leading-relaxed">
          We implement industry-standard security practices including password hashing with bcrypt, JWT session management, and role-based access control.
        </p>
        <ul class="space-y-3">
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Secure password hashing</span>
          </li>
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">JWT token authentication</span>
          </li>
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Role-based permissions</span>
          </li>
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Session management</span>
          </li>
        </ul>
      </div>
      
      <!-- Performance Card -->
      <div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-emerald-500/30 p-8 hover:border-emerald-400/50 transition-all duration-300 group">
        <div class="flex items-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
            <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">Performance</h3>
            <div class="w-12 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mt-2"></div>
          </div>
        </div>
        <p class="text-lg text-gray-300 mb-6 leading-relaxed">
          Built for speed and scalability with modern web technologies and optimized database queries.
        </p>
        <ul class="space-y-3">
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Fast SvelteKit performance</span>
          </li>
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Efficient database queries</span>
          </li>
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Responsive design</span>
          </li>
          <li class="flex items-center group/item">
            <div class="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
            <span class="text-gray-300 group-hover/item:text-white transition-colors duration-300">Optimized for all devices</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
      
      <!-- CTA Content -->
      <div class="relative bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-md text-white rounded-3xl p-16 shadow-2xl border border-green-500/30">
        <div class="text-center">
          <div class="flex items-center justify-center mb-8">
            <div class="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
            <h2 class="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full ml-4"></div>
          </div>
          
          <p class="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our platform today and experience <span class="text-green-400 font-semibold">secure</span>, <span class="text-emerald-400 font-semibold">reliable</span> authentication.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="/register" 
              class="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105 border border-green-500/30 hover:border-green-400/50"
            >
              <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Sign Up Now
            </a>
            
            <a 
              href="/contact" 
              class="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-gray-500/30 transform hover:scale-105 border border-gray-600/30 hover:border-gray-500/50"
            >
              <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
