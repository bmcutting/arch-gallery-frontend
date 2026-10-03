import ProjectFeedSkeleton from "@modules/project/components/ProjectFeedSkeleton";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen" aria-busy="true" aria-label="Cargando perfil">
      <div className="mt-14 bg-card border-b border-border">
        <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto lg:mx-0 rounded-full bg-muted animate-pulse shrink-0" />

            <div className="flex-1 min-w-0 flex flex-col items-center lg:items-start">
              <div className="h-8 md:h-10 lg:h-12 w-3/4 sm:w-1/2 bg-muted rounded mb-3 animate-pulse" />
              <div className="h-5 md:h-6 w-2/3 sm:w-1/3 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-4 md:h-5 w-5/6 sm:w-2/5 bg-muted rounded mb-4 animate-pulse" />

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-36 bg-muted rounded animate-pulse" />
              </div>

              <div className="flex gap-4 mb-6">
                <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
                <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
                <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
              </div>

              <div className="flex gap-2 mb-6">
                <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="h-10 w-36 bg-muted rounded-lg animate-pulse" />
                <div className="h-10 w-36 bg-muted rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-4 lg:py-6">
        <div className="border-b border-border mb-6 md:mb-8 lg:mb-12 flex gap-2 md:gap-4 py-3 md:py-4">
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          <div className="h-6 w-28 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectFeedSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
