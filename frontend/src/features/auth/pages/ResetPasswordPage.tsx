import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/utils/validation/authSchemas';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { PasswordStrengthMeter } from '@/features/auth/components/PasswordStrengthMeter';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });

  const password = watch('password', '');

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await authService.resetPassword({ token, password: values.password });
      toast.success('Password updated. Sign in with your new password.');
      navigate('/login', { replace: true });
    } catch {
      toast.error('This reset link is invalid or expired.');
    }
  };

  return (
    <AuthLayout title="Set a new password" subtitle="Make sure it's something secure">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="text-sm font-medium text-heading">New password</label>
          <input
            type="password"
            {...register('password')}
            className="mt-1.5 w-full rounded-[14px] border border-border bg-surface px-3.5 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="••••••••"
          />
          <PasswordStrengthMeter password={password} />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-heading">Confirm password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="mt-1.5 w-full rounded-[14px] border border-border bg-surface px-3.5 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-primary text-white py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          Reset password
        </button>
      </form>
    </AuthLayout>
  );
}
