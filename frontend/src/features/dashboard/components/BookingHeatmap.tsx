import { useBookingHeatmap } from '@/features/dashboard/hooks/useDashboardData';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function intensity(bookings: number, max: number) {
  if (max === 0) return 0;
  return bookings / max;
}

export function BookingHeatmap() {
  const { data, isLoading, isError, refetch } = useBookingHeatmap();
  const max = data ? Math.max(...data.map((d) => d.bookings), 1) : 1;

  function getCell(day: string, hour: number) {
    return data?.find((d) => d.day === day && d.hour === hour)?.bookings ?? 0;
  }

  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-heading">Booking heatmap</h3>
      <p className="text-xs text-text mt-0.5">Peak allocation request hours across the week</p>

      <div className="mt-4 overflow-x-auto">
        {isLoading && <Skeleton className="h-40 w-full" />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && (
          <div className="min-w-[640px]">
            <div className="grid" style={{ gridTemplateColumns: `40px repeat(24, 1fr)` }}>
              <div />
              {HOURS.filter((h) => h % 3 === 0).map((h) => (
                <div key={h} className="col-span-3 text-[10px] text-text text-center">{h}:00</div>
              ))}
            </div>
            {DAYS.map((day) => (
              <div key={day} className="grid items-center gap-[2px]" style={{ gridTemplateColumns: `40px repeat(24, 1fr)` }}>
                <span className="text-[11px] text-text">{day}</span>
                {HOURS.map((hour) => {
                  const val = getCell(day, hour);
                  const alpha = 0.08 + intensity(val, max) * 0.85;
                  return (
                    <div
                      key={hour}
                      title={`${day} ${hour}:00 — ${val} bookings`}
                      className="aspect-square rounded-[3px]"
                      style={{ backgroundColor: `rgba(47, 107, 95, ${alpha})` }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
