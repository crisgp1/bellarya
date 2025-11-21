import { LoginForm } from '@/components/login-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  // If already logged in, redirect to dashboard
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="logo text-4xl md:text-5xl tracking-wider font-medium mb-2">
            BELLARYA
          </h1>
          <p className="display-text text-muted-foreground text-sm uppercase tracking-[0.3em] font-light italic">
            Admin Login
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
