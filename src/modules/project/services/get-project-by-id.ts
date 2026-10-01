import { instance } from "@modules/app/modules/http/domain/instance";
import type { Project } from "@modules/project/domain/entities/project";
import type { ProjectResponse } from "@modules/project/dto/read/project";
import { ProjectMapper } from "./project-mapper";

interface Props {
  projectId: string;
}

export async function getProjectById(props: Props): Promise<Project> {
  return instance
    .get<ProjectResponse>(`projects/${props.projectId}`)
    .then((res) => {
      const projects = ProjectMapper.toDomain(res.data);
      return projects;
    });
}
