export default function ProjectFeedSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-warm overflow-hidden">
      <div className="aspect-4/3 w-full bg-muted animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-muted rounded w-2/3 animate-pulse" />
          <div className="h-5 bg-muted rounded w-12 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
          <div className="h-3 bg-muted rounded w-24 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="pt-3 border-t border-border flex gap-3">
          <div className="h-9 flex-1 bg-muted rounded-input animate-pulse" />
          <div className="h-9 flex-1 bg-muted rounded-input animate-pulse" />
        </div>
        <div className="h-9 w-full bg-muted rounded-input animate-pulse" />
      </div>
    </div>
  );
}
