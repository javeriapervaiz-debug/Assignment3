<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	
	let isSubmitting = $state(false);
</script>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="relative overflow-hidden mb-12">
			<!-- Animated Background -->
			<div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-600/20 animate-pulse"></div>
			<div class="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
			
			<!-- Header Content -->
			<div class="relative bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-500/30 p-10">
				<div class="flex items-center">
					<div class="w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-green-500/30 animate-pulse">
						<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</div>
					<div>
						<h1 class="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
							Profile Settings
						</h1>
						<p class="mt-3 text-xl text-gray-300">Manage your <span class="text-green-400 font-semibold">account information</span> and preferences.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Profile Form -->
		<div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md shadow-2xl rounded-3xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
			<div class="px-10 py-12">
				<!-- Success Message -->
				{#if form?.success}
					<div class="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm">
						<div class="flex items-center">
							<div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
								<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
								</svg>
							</div>
							<p class="text-lg font-medium text-green-300">{form.message}</p>
						</div>
					</div>
				{/if}

				<!-- Error Message -->
				{#if form?.error}
					<div class="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 backdrop-blur-sm">
						<div class="flex items-center">
							<div class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
								<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
							</div>
							<p class="text-lg font-medium text-red-300">{form.error}</p>
						</div>
					</div>
				{/if}

				<form 
					method="POST" 
					action="?/updateProfile"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							isSubmitting = false;
							await update();
						};
					}}
					class="space-y-10"
				>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<!-- Name Field -->
						<div class="md:col-span-2">
							<label for="name" class="block text-lg font-semibold text-gray-300 mb-4">
								Full Name
							</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
								<input
									id="name"
									name="name"
									type="text"
									required
									value={data.user.name || ''}
									class="block w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-green-600/30 rounded-2xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm text-lg hover:border-green-500/50"
									placeholder="Enter your full name"
								/>
							</div>
						</div>

						<!-- Email Field (Read-only) -->
						<div class="md:col-span-2">
							<label for="email" class="block text-lg font-semibold text-gray-300 mb-4">
								Email Address
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
									readonly
									value={data.user.email}
									class="block w-full pl-12 pr-4 py-4 bg-gray-800/30 border border-gray-600/30 rounded-2xl text-gray-400 cursor-not-allowed backdrop-blur-sm text-lg"
								/>
							</div>
							<p class="mt-3 text-sm text-gray-400">Email cannot be changed. Contact support if you need to update your email.</p>
						</div>
					</div>

					<!-- Account Information -->
					<div class="border-t border-green-600/30 pt-8">
						<div class="flex items-center mb-6">
							<div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
								<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<h3 class="text-2xl font-bold text-white">Account Information</h3>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
							<div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30">
								<span class="font-semibold text-gray-300">Account ID:</span>
								<span class="ml-3 text-gray-400 font-mono text-sm bg-gray-700/50 px-3 py-1 rounded-lg">{data.user.id}</span>
							</div>
							<div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30">
								<span class="font-semibold text-gray-300">Email Status:</span>
								<span class="ml-3">
									{#if data.user.emailVerified}
										<span class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-500/30">
											<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
											Verified
										</span>
									{:else}
										<span class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
											<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
											</svg>
											Unverified
										</span>
									{/if}
								</span>
							</div>
						</div>
					</div>

					<!-- Save Button -->
					<div class="flex justify-end pt-8 border-t border-green-600/30">
						<button
							type="submit"
							disabled={isSubmitting}
							class="group inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
						>
							{#if isSubmitting}
								<svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Saving...
							{:else}
								<svg class="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								Save Changes
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Navigation -->
		<div class="mt-12 flex justify-center">
			<a 
				href="/dashboard" 
				class="group inline-flex items-center px-6 py-3 text-lg font-semibold text-gray-400 hover:text-green-400 transition-all duration-300 hover:bg-green-500/10 rounded-xl border border-transparent hover:border-green-500/30"
			>
				<svg class="mr-3 w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Dashboard
			</a>
		</div>
	</div>
</div>
