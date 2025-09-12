<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Determine error message based on data.error
	let errorMessage = $state('');
	
	// Only set error message if there's actually an error
	if (data.error && data.error !== '') {
		switch (data.error) {
			case 'invalid_verification_token':
				errorMessage = 'Invalid verification token. Please try again.';
				break;
			case 'verification_token_expired':
				errorMessage = 'Verification token has expired. Please request a new one.';
				break;
			case 'user_not_found':
				errorMessage = 'Account not found. Please register for a new account.';
				break;
			case 'verification_failed':
				errorMessage = 'Email verification failed. Please try again.';
				break;
			case 'CredentialsSignin':
				errorMessage = 'Invalid email or password. Please check your credentials and try again.';
				break;
			default:
				errorMessage = 'An error occurred during sign in. Please try again.';
		}
	} else {
		// Explicitly clear error message when there's no error
		errorMessage = '';
	}
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
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
						</svg>
					</div>
					<h2 class="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-2xl">
						Sign in to your account
					</h2>
					<p class="mt-4 text-lg text-gray-300">
						Don't have an account?
						<a
							href="/register"
							class="font-semibold text-green-400 hover:text-green-300 transition-colors duration-300"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>

		<!-- Login Form Card -->
		<div class="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md py-10 px-8 shadow-2xl rounded-3xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
			<!-- OAuth Buttons Section -->
			<div class="space-y-6 mb-8">
				<!-- Google Sign In -->
				<form method="POST" action="/auth/signin/google">
					<button
						type="submit"
						class="group w-full flex justify-center items-center px-6 py-4 border border-gray-600/30 rounded-2xl text-lg font-semibold text-white bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 backdrop-blur-sm hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105"
					>
						<svg class="w-6 h-6 mr-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Continue with Google
					</button>
				</form>

				<!-- GitHub Sign In -->
				<form method="POST" action="/auth/signin/github">
					<button
						type="submit"
						class="group w-full flex justify-center items-center px-6 py-4 border border-gray-600/30 rounded-2xl text-lg font-semibold text-white bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 backdrop-blur-sm hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105"
					>
						<svg class="w-6 h-6 mr-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						Continue with GitHub
					</button>
				</form>
			</div>

			<!-- Divider -->
			<div class="relative mb-8">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-green-600/30"></div>
				</div>
				<div class="relative flex justify-center text-lg">
					<span class="px-6 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 text-gray-400 backdrop-blur-sm font-semibold">OR</span>
				</div>
			</div>
			<!-- Password Reset Success Message -->
			{#if data.passwordResetSuccess}
				<div class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-300">Password Reset Successful</h3>
							<div class="mt-2 text-sm text-green-200">
								<p>Your password has been updated successfully. You can now sign in with your new password.</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Email Verification Success Message -->
			{#if data.isVerified}
				<div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-sm">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-emerald-300">Email Verified Successfully!</h3>
							<div class="mt-2 text-sm text-emerald-200">
								<p>Your email has been successfully verified. You can now sign in to your account.</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Error Message -->
			{#if errorMessage}
				<div class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-300">Sign In Message</h3>
							<div class="mt-2 text-sm text-red-200">
								<p>{errorMessage}</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
			<!--
        **FIX #1: Added method="POST" and the correct action attribute.
        This tells the form to send the data to the Auth.js credentials handler.
      -->
			<form class="space-y-8" method="POST" action="/auth/callback/credentials">
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
							autocomplete="current-password"
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
						class="group relative flex w-full justify-center items-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-bold text-white hover:from-green-700 hover:to-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition-all duration-300 shadow-2xl hover:shadow-green-500/30 transform hover:scale-105"
					>
						<svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
						</svg>
						Sign In
					</button>
				</div>
			</form>
		</div>

		<!-- Additional Links -->
		<div class="text-center">
			<p class="text-lg text-gray-400">
				<a href="/forgot-password" class="font-semibold text-green-400 hover:text-green-300 transition-colors duration-300 hover:underline"
					>Forgot your password?</a
				>
			</p>
		</div>
	</div>
</div>