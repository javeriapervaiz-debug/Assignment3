import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  
  // If no session exists, redirect to login
  if (!session?.user) {
    throw redirect(303, '/login');
  }
  
  return {
    session
  };
};
