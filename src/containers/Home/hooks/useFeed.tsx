import { useEffect, useState } from "react";
import type { ProjectFeed } from "../../../modules/project/domain/entities/project-feed";
import { getProjectFeed } from "../../../modules/project/services/get-feed";

export default function useFeed() {
  const [projects, setProjects] = useState<ProjectFeed[] | null>(null);

  useEffect(() => {
    getProjectFeed()
      .then((data) => {
        setProjects(data);
      })
      .catch(() => {
        setProjects(null);
      });
  }, []);

  return { projects };
}
