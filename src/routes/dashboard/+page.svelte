<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Handle logout with redirect
	async function handleLogout() {
		await signOut();
		goto('/login');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
	<div class="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
		<!-- Welcome Header -->
		<div class="relative overflow-hidden">
			<!-- Animated Background -->
			<div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
			<div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
			
			<!-- Welcome Content -->
			<div class="relative bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md overflow-hidden shadow-2xl rounded-3xl border border-green-500/30">
				<div class="px-10 py-12">
					<div class="text-center">
						<div class="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30 animate-pulse">
							<svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</div>
						<h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
							Welcome to your Dashboard!
						</h1>
						<p class="text-xl text-gray-300 mb-8">
							Hello, <span class="text-green-400 font-semibold">{data.session?.user?.name || data.session?.user?.email}</span>!
						</p>
					</div>

					<!-- Quick Actions -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
						<!-- Profile Management Card -->
						<div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-300">
							<div class="flex items-start space-x-4">
								<div class="w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
									<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
								<div class="flex-1">
									<h3 class="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 mb-3">Profile Management</h3>
									<p class="text-gray-300 mb-6 leading-relaxed">Update your personal information and preferences.</p>
									<a 
										href="/dashboard/profile" 
										class="group/link inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 backdrop-blur-sm text-white rounded-xl hover:bg-green-500/10 transition-all duration-300 font-medium border border-green-500/30 hover:border-green-400/50"
									>
										Manage Profile
										<svg class="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
										</svg>
									</a>
								</div>
							</div>
						</div>

						<!-- Account Security Card -->
						<div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-500/30 p-8 hover:border-emerald-400/50 transition-all duration-300">
							<div class="flex items-start space-x-4">
								<div class="w-16 h-16 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
									<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
								</div>
								<div class="flex-1">
									<h3 class="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-3">Account Security</h3>
									<p class="text-gray-300 mb-6 leading-relaxed">Your account is secure and protected.</p>
									<div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm text-white rounded-xl font-medium border border-emerald-500/30">
										<svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										Secured
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="flex flex-col sm:flex-row gap-6 mt-12 justify-center">
						<a 
							href="/dashboard/profile" 
							class="group inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
						>
							<svg class="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
							View Profile
						</a>
						
						<button 
							onclick={handleLogout}
							class="group inline-flex justify-center items-center px-8 py-4 border border-gray-600/30 text-lg font-bold rounded-2xl text-gray-300 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-2xl hover:shadow-gray-500/30 transform hover:scale-105"
						>
							<svg class="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Quick Stats -->
		<div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-300">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
							<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-6">
						<p class="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">Account Status</p>
						<p class="text-xl font-bold text-green-400">Active</p>
					</div>
				</div>
			</div>

			<div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-500/30 p-8 hover:border-emerald-400/50 transition-all duration-300">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
							<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-6">
						<p class="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">Email Verified</p>
						<p class="text-xl font-bold text-emerald-400">Confirmed</p>
					</div>
				</div>
			</div>

			<div class="group bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-500/30 p-8 hover:border-amber-400/50 transition-all duration-300">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110">
							<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-6">
						<p class="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">Security</p>
						<p class="text-xl font-bold text-amber-400">Protected</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
