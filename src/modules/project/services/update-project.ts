import { instance } from "../../app/modules/http/domain/instance";
import type { UpdateProjectDto } from "../dto/write/update-project";

export function updateProject(props: UpdateProjectDto): Promise<boolean> {
  console.log(props);
  return instance.put<boolean>("projects", props).then((res) => res.data);
}
