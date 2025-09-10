<!-- Welcome Page -->
<div class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
	<div class="text-center max-w-2xl mx-auto">
		<!-- Main Headline -->
		<h1 class="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
			Welcome to <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Auth App</span>
		</h1>
		
		<!-- Subtitle -->
		<p class="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed">
			Your secure authentication solution for seamless user management and login experiences.
		</p>
		
		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<!-- Login Button -->
			<a 
				href="/login" 
				class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
			>
				Log In
			</a>
			
			<!-- Register Button -->
			<a 
				href="/register" 
				class="w-full sm:w-auto px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600/50 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-300/50"
			>
				Register
			</a>
		</div>
		
		<!-- Quick Links -->
		<div class="mt-16">
			<p class="text-gray-400 mb-6">Learn more about our platform</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
				<a 
					href="/about" 
					class="text-purple-400 hover:text-purple-300 font-medium underline underline-offset-4 hover:underline-offset-8 transition-all duration-200"
				>
					About Us
				</a>
				<span class="hidden sm:inline text-gray-500">•</span>
				<a 
					href="/faq" 
					class="text-purple-400 hover:text-purple-300 font-medium underline underline-offset-4 hover:underline-offset-8 transition-all duration-200"
				>
					FAQ
				</a>
				<span class="hidden sm:inline text-gray-500">•</span>
				<a 
					href="/contact" 
					class="text-purple-400 hover:text-purple-300 font-medium underline underline-offset-4 hover:underline-offset-8 transition-all duration-200"
				>
					Contact Us
				</a>
			</div>
		</div>
		
		<!-- Optional decorative element -->
		<div class="mt-12 flex justify-center">
			<div class="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
		</div>
	</div>
</div>
