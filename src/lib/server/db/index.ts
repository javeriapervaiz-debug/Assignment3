import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Force use of Docker container URL for development
const databaseUrl = 'postgresql://postgres:12345678@localhost:5434/my_authentication_db';

if (!databaseUrl) throw new Error('DATABASE_URL is not set');

console.log('Connecting to database:', databaseUrl.replace(/\/\/.*@/, '//***@')); // Hide password in logs

const client = postgres(databaseUrl);

export const db = drizzle(client, { schema });
