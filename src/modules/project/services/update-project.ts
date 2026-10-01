import { instance } from "@modules/app/modules/http/domain/instance";
import type { UpdateProjectDto } from "@modules/project/dto/write/update-project";

export function updateProject(props: UpdateProjectDto): Promise<boolean> {
  return instance
    .put<boolean>(`projects/${props.projectId}`, props)
    .then((res) => res.data);
}
