import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormValues } from '@/utils/validation/authSchemas';
import { AuthLayout } from '@/features/auth/components/AuthLayout';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success('Welcome back');
      const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch {
      toast.error('Invalid email or password');
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Access your AssetFlow workspace">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="text-sm font-medium text-heading">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1.5 w-full rounded-[14px] border border-border bg-surface px-3.5 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-heading">Password</label>
          <div className="relative mt-1.5">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full rounded-[14px] border border-border bg-surface px-3.5 py-2.5 pr-10 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-text">
            <input type="checkbox" {...register('rememberMe')} className="rounded border-border accent-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-primary text-white py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}
