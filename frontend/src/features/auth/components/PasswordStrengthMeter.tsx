import { getPasswordStrength } from '@/utils/validation/authSchemas';

const BAR_COLORS = ['bg-red-400', 'bg-orange-400', 'bg-secondary', 'bg-accent', 'bg-primary'];

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const { score, label } = getPasswordStrength(password);
  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i < score ? BAR_COLORS[score] : 'bg-border'
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-text">{label}</p>
    </div>
  );
}
