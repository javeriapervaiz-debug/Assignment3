<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-10">
		<!-- Header -->
		<div class="text-center">
			<div class="relative overflow-hidden mb-8">
				<!-- Animated Background -->
				<div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
				<div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
				
				<!-- Header Content -->
				<div class="relative bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-500/30 p-8">
					<div class="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30 animate-pulse">
						<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
					<h2 class="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
						Create your account
					</h2>
					<p class="mt-4 text-lg text-gray-300">
						Already have an account?
						<a href="/login" class="font-semibold text-green-400 hover:text-green-300 transition-colors duration-300">
							Sign in
						</a>
					</p>
				</div>
			</div>
		</div>

		<!-- Registration Form Card -->
		<div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md py-10 px-8 shadow-2xl rounded-3xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
			<!-- Success Message -->
			{#if form?.success}
				<div class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-emerald-300 mb-2">{form.success}</p>
							{#if form.requiresVerification}
								<a 
									href="/verify-email-pending" 
									class="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
								>
									<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
									</svg>
									Check Your Email
								</a>
							{:else}
								<a 
									href="/login" 
									class="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
								>
									<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
									Go to Sign In
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			<!-- Error Message -->
			{#if form?.error}
				<div class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-red-300">{form.error}</p>
						</div>
					</div>
				</div>
			{/if}

			<form method="POST" action="?/register" class="space-y-8">
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-lg font-semibold text-gray-300 mb-4">
						Email address
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
							</svg>
						</div>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="block w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm text-lg hover:border-green-500/50"
							placeholder="Enter your email"
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-lg font-semibold text-gray-300 mb-4">
						Password
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="new-password"
							required
							class="block w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm text-lg hover:border-green-500/50"
							placeholder="Enter your password"
						/>
					</div>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center items-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-bold text-white hover:from-green-700 hover:to-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
					>
						<svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
						</svg>
						Create Account
					</button>
				</div>
			</form>
		</div>

		<!-- Additional Links -->
		<div class="text-center">
			<p class="text-lg text-gray-400">
				By signing up, you agree to our
				<a href="/terms" class="font-semibold text-green-400 hover:text-green-300 transition-colors duration-300 hover:underline">Terms of Service</a>
				and
				<a href="/privacy" class="font-semibold text-green-400 hover:text-green-300 transition-colors duration-300 hover:underline">Privacy Policy</a>
			</p>
		</div>
	</div>
</div>
