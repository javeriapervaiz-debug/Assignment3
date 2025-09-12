<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { signOut } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Handle logout with redirect
	async function handleLogout() {
		await signOut();
		goto('/login');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Header Navbar -->
<header class="bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-md shadow-2xl border-b border-green-500/40">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- App Title -->
			<div class="flex items-center">
				<a href="/" class="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-green-200 transition-all duration-300 drop-shadow-lg">
					🔐 Auth App
				</a>
			</div>
			
			<!-- Navigation Links -->
			<div class="flex items-center space-x-4">
				<!-- Public Navigation (always visible) -->
				<div class="hidden md:flex items-center space-x-4">
					<a 
						href="/about" 
						class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
					>
						About
					</a>
					<a 
						href="/faq" 
						class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
					>
						FAQ
					</a>
					<a 
						href="/contact" 
						class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
					>
						Contact
					</a>
				</div>
				
				{#if data.session?.user}
					<!-- Authenticated User Navigation -->
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-300">
							Welcome, {data.session.user.name || data.session.user.email}!
						</span>
						
						<a 
							href="/dashboard" 
							class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
						>
							Dashboard
						</a>
						
						<a 
							href="/dashboard/profile" 
							class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
						>
							Profile
						</a>
						
						<!-- AI Chat Link -->
						<a 
							href="/chat" 
							class="text-green-400 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-green-500/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 shadow-lg shadow-green-500/20"
						>
							🤖 AI Chat
						</a>
						
						<!-- Chat Dashboard Link -->
						<a 
							href="/chat/dashboard" 
							class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-gray-600/40 bg-gray-800/40 hover:bg-gray-700/50 hover:shadow-lg hover:shadow-gray-500/20"
						>
							📊 Chat Stats
						</a>
						
						<!-- Admin-only navigation -->
						{#if data.session.user?.role === 'admin'}
							<a 
								href="/admin" 
								class="text-red-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-red-500/30 bg-red-500/10"
							>
								Admin Panel
							</a>
						{/if}
						
						<button 
							onclick={handleLogout}
							class="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl hover:shadow-gray-500/20"
						>
							Sign Out
						</button>
					</div>
				{:else}
					<!-- Guest Navigation -->
					<div class="flex items-center space-x-4">
						<a 
							href="/register" 
							class="text-gray-400 hover:text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20"
						>
							Register
						</a>
						<a 
							href="/login" 
							class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
						>
							Login
						</a>
					</div>
				{/if}
			</div>
		</div>
	</nav>
	
	<!-- Mobile Navigation Menu (hidden by default) -->
	<div class="md:hidden bg-gray-900/50 border-b border-green-600/30 px-4 py-2">
		<div class="flex flex-wrap justify-center gap-4">
			<a 
				href="/about" 
				class="text-gray-400 hover:text-green-400 text-sm font-medium transition-colors duration-200"
			>
				About
			</a>
			<a 
				href="/faq" 
				class="text-gray-400 hover:text-green-400 text-sm font-medium transition-colors duration-200"
			>
				FAQ
			</a>
			<a 
				href="/contact" 
				class="text-gray-400 hover:text-green-400 text-sm font-medium transition-colors duration-200"
			>
				Contact
			</a>
		</div>
	</div>
</header>

<!-- Main Content Area -->
<main class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
	{@render children()}
</main>
