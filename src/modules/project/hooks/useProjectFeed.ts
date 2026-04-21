import { useCallback, useEffect, useRef, useState } from "react";
import { getProjectFeed } from "../services/get-feed";
import type { Project } from "../domain/entities/project";

interface ProjectFeedItem {
  project: Project;
  likedByUser: boolean;
}

export default function useProjectFeed() {
  const [projects, setProjects] = useState<ProjectFeedItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getProjectFeed(nextCursor);

      setProjects((prev) => {
        const ids = new Set(prev.map((p) => p.project.id));
        const filtered = data.items.filter((item) => !ids.has(item.project.id));
        return [...prev, ...filtered];
      });

      setNextCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [loadMore]);
  return { projects, loading, loaderRef };
}
