'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignIn, Eye, EyeSlash } from '@phosphor-icons/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="border-2 border-border bg-background p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-light mb-2 uppercase tracking-wider">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-none border-border/30 focus:border-foreground/30 font-light"
            placeholder="admin@bellarya.com"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-light mb-2 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-none border-border/30 focus:border-foreground/30 font-light pr-12"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeSlash weight="thin" className="h-5 w-5" />
              ) : (
                <Eye weight="thin" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-3">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold uppercase tracking-widest text-sm rounded-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <SignIn weight="bold" className="h-5 w-5" />
              Sign In
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground/70">
        <p>Default credentials: admin@bellarya.com / admin123</p>
      </div>
    </div>
  );
}
