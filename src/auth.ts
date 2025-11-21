import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Temporary admin credentials (in production, use database)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bellarya.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);

async function getUser(email: string): Promise<{ id: string; name: string; email: string; password: string } | undefined> {
  try {
    // For now, return hardcoded admin user
    // In production, fetch from database
    if (email === ADMIN_EMAIL) {
      return {
        id: '1',
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD_HASH,
      };
    }
    return undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export const { GET, POST } = handlers;
