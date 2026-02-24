import { instance } from "../../app/modules/http/domain/instance";
import type { ProjectResponse } from "../dto/read/project";
import type { CreateProjectDto } from "../dto/write/create-project";

export function createProject(
  props: CreateProjectDto,
): Promise<ProjectResponse> {
  return instance
    .post<ProjectResponse>("projects", props)
    .then((res) => res.data);
}
