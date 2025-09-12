<!-- Welcome Page -->
<div class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
	<div class="text-center max-w-4xl mx-auto">
		<!-- Main Headline -->
		<h1 class="text-6xl sm:text-7xl font-bold text-white mb-8 leading-tight">
			Welcome to <span class="bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">Auth App</span>
		</h1>
		
		<!-- Subtitle -->
		<p class="text-2xl sm:text-3xl text-gray-300 mb-16 leading-relaxed">
			Your <span class="text-green-400 font-semibold">secure</span> authentication solution for seamless user management and login experiences.
		</p>
		
		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
			<!-- Login Button -->
			<a 
				href="/login" 
				class="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300/50"
			>
				<svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
				</svg>
				Log In
			</a>
			
			<!-- Register Button -->
			<a 
				href="/register" 
				class="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 backdrop-blur-sm border border-gray-600/50 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-gray-500/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300/50"
			>
				<svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
				</svg>
				Register
			</a>
		</div>
		
		<!-- Quick Links -->
		<div class="mt-20">
			<p class="text-xl text-gray-400 mb-8">Learn more about our platform</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
				<a 
					href="/about" 
					class="group text-green-400 hover:text-green-300 font-semibold text-lg underline underline-offset-4 hover:underline-offset-8 transition-all duration-300 hover:scale-105"
				>
					<svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					About Us
				</a>
				<span class="hidden sm:inline text-gray-500 text-xl">•</span>
				<a 
					href="/faq" 
					class="group text-green-400 hover:text-green-300 font-semibold text-lg underline underline-offset-4 hover:underline-offset-8 transition-all duration-300 hover:scale-105"
				>
					<svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					FAQ
				</a>
				<span class="hidden sm:inline text-gray-500 text-xl">•</span>
				<a 
					href="/contact" 
					class="group text-green-400 hover:text-green-300 font-semibold text-lg underline underline-offset-4 hover:underline-offset-8 transition-all duration-300 hover:scale-105"
				>
					<svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Contact Us
				</a>
			</div>
		</div>
		
		<!-- Optional decorative element -->
		<div class="mt-16 flex justify-center">
			<div class="w-24 h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full shadow-lg shadow-green-500/30"></div>
		</div>
	</div>
</div>
