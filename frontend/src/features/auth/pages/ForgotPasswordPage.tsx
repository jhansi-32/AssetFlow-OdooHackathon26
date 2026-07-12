import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Loader2, MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/utils/validation/authSchemas';
import { AuthLayout } from '@/features/auth/components/AuthLayout';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await authService.forgotPassword(values);
      setSent(true);
    } catch {
      toast.error('Something went wrong. Try again.');
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
            <MailCheck className="text-accent" size={22} />
          </div>
          <p className="mt-4 text-sm text-text">
            We sent password reset instructions to{' '}
            <span className="text-heading font-medium">{getValues('email')}</span>.
          </p>
          <Link to="/login" className="mt-6 inline-block text-sm text-primary font-medium hover:underline">
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot password" subtitle="We'll send you reset instructions">
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-primary text-white py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          Send reset link
        </button>
        <Link to="/login" className="block text-center text-sm text-primary font-medium hover:underline">
          Back to sign in
        </Link>
      </form>
    </AuthLayout>
  );
}
