import { useEffect, useState } from "react";
import type { Project } from "../../../modules/project/domain/entities/project";
import { getProjectByLoggedUser } from "../../../modules/project/services/get-project";

export default function useProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    getProjectByLoggedUser()
      .then((data) => {
        setProjects(data);
      })
      .catch(() => {});
  }, []);

  return { projects, showCreateModal, setShowCreateModal };
}
