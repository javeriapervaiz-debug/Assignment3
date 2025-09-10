// src/routes/reset-password/[token]/+page.server.ts

import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, passwordResetTokens } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { token } = params;

	if (!token) {
		throw redirect(302, '/forgot-password');
	}

	try {
		// Find all password reset tokens and check each one
		// (since we store hashed tokens, we need to compare each one)
		const resetTokens = await db.execute(sql`SELECT * FROM password_reset_tokens_new WHERE used IS NULL`);
		
		let validToken = null;
		for (const storedToken of resetTokens.rows) {
			const isValidToken = await bcrypt.compare(token, storedToken.token);
			if (isValidToken) {
				validToken = storedToken;
				break;
			}
		}

		// Check if token exists and hasn't expired
		if (!validToken || new Date(validToken.expires) < new Date()) {
			throw redirect(302, '/forgot-password?error=invalid-token');
		}

		// Token is valid, return success (don't expose sensitive data)
		return {
			valid: true
		};

	} catch (error) {
		console.error('Error validating reset token:', error);
		throw redirect(302, '/forgot-password?error=invalid-token');
	}
};

export const actions: Actions = {
	resetPassword: async ({ request, params }) => {
		const { token } = params;
		const data = await request.formData();
		const newPassword = data.get('newPassword') as string;
		const confirmPassword = data.get('confirmPassword') as string;

		// Validation
		if (!newPassword || !confirmPassword) {
			return fail(400, {
				fieldErrors: {
					newPassword: !newPassword ? 'New password is required' : undefined,
					confirmPassword: !confirmPassword ? 'Please confirm your password' : undefined
				},
				newPassword,
				confirmPassword
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				fieldErrors: {
					confirmPassword: 'Passwords do not match'
				},
				newPassword,
				confirmPassword
			});
		}

		// Password strength validation
		if (newPassword.length < 8) {
			return fail(400, {
				fieldErrors: {
					newPassword: 'Password must be at least 8 characters long'
				},
				newPassword,
				confirmPassword
			});
		}

		// Check for at least one number, one uppercase, one lowercase letter
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
		if (!passwordRegex.test(newPassword)) {
			return fail(400, {
				fieldErrors: {
					newPassword: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
				},
				newPassword,
				confirmPassword
			});
		}

		try {
			// Find and validate the token again
			const resetTokens = await db.execute(sql`SELECT * FROM password_reset_tokens_new WHERE used IS NULL`);
			
			let validTokenRecord = null;
			for (const storedToken of resetTokens.rows) {
				const isValidToken = await bcrypt.compare(token, storedToken.token);
				if (isValidToken) {
					validTokenRecord = storedToken;
					break;
				}
			}

			if (!validTokenRecord || new Date(validTokenRecord.expires) < new Date()) {
				return fail(400, {
					error: 'This password reset link has expired or is invalid. Please request a new one.',
					newPassword,
					confirmPassword
				});
			}

			// Find the user by email
			const user = await db.query.users.findFirst({
				where: eq(users.email, validTokenRecord.email)
			});

			if (!user) {
				return fail(400, {
					error: 'User not found. Please request a new password reset.',
					newPassword,
					confirmPassword
				});
			}

			// Hash the new password
			const hashedPassword = await bcrypt.hash(newPassword, 12);

			// Update user's password using raw SQL
			await db.execute(sql`
				UPDATE users 
				SET hashed_password = ${hashedPassword} 
				WHERE id = ${user.id}
			`);

			// Mark the token as used using raw SQL
			await db.execute(sql`
				UPDATE password_reset_tokens_new 
				SET used = NOW() 
				WHERE token = ${validTokenRecord.token}
			`);

			// Optionally, delete all other reset tokens for this email using raw SQL
			await db.execute(sql`
				DELETE FROM password_reset_tokens_new 
				WHERE email = ${validTokenRecord.email} AND token != ${validTokenRecord.token}
			`);

			// Redirect to login with success message
			throw redirect(302, '/login?message=password-reset-success');

		} catch (error) {
			console.error('Error resetting password:', error);
			
			// If this is already a redirect, re-throw it
			if (error instanceof Response) {
				throw error;
			}

			return fail(500, {
				error: 'An error occurred while resetting your password. Please try again.',
				newPassword,
				confirmPassword
			});
		}
	}
};
