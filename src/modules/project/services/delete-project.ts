import { instance } from "../../app/modules/http/domain/instance";
import type { DeleteProjectDto } from "../dto/write/delete-project";

export function deleteProject(props: DeleteProjectDto): Promise<boolean> {
  return instance.delete<boolean>(`projects/${props.projectId}`).then((res) => res.data);
}
