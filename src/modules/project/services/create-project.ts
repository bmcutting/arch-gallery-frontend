import { instance } from "@modules/app/modules/http/domain/instance";
import type { ProjectResponse } from "@modules/project/dto/read/project";
import type { CreateProjectDto } from "@modules/project/dto/write/create-project";

export function createProject(
  props: CreateProjectDto,
): Promise<ProjectResponse> {
  return instance
    .post<ProjectResponse>("projects", props)
    .then((res) => res.data);
}
