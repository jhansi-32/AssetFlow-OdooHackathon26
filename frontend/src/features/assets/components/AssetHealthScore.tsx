function getColor(score: number) {
  if (score >= 85) return '#2F6B5F';
  if (score >= 65) return '#7A9E7E';
  if (score >= 40) return '#D9C7A3';
  return '#D9534F';
}

export function AssetHealthScore({ score }: { score: number }) {
  const color = getColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium text-heading">{score}</span>
    </div>
  );
}
