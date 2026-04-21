export default function ArchitectCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-warm flex flex-col h-full">
      <div className="h-32 w-full bg-muted animate-pulse" />
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <div className="relative -mt-8 mb-3">
          <div className="w-16 h-16 rounded-full bg-muted ring-3 ring-card animate-pulse" />
        </div>
        <div className="h-5 bg-muted rounded w-3/5 mb-2 animate-pulse" />
        <div className="h-3 bg-muted rounded w-2/5 mb-2 animate-pulse" />
        <div className="h-3 bg-muted rounded w-full mb-1 animate-pulse" />
        <div className="h-3 bg-muted rounded w-4/5 mb-3 animate-pulse" />
        <div className="h-9 w-full bg-muted rounded-input animate-pulse mt-auto" />
      </div>
    </div>
  );
}
