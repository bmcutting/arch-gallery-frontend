import { instance } from "../../app/modules/http/domain/instance";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";
import { ProjectMapper } from "./project-mapper";

export async function getProjectByUserId(): Promise<Project> {
  return instance.get<ProjectResponse>(`projects/me}`).then((res) => {
    return ProjectMapper.execute(res.data);
  });
}
