import { instance } from "../../app/modules/http/domain/instance";
import type { Project } from "../domain/entities/project";
import type { ProjectFeedItemResponse } from "./get-all-projects";
import { ProjectMapper } from "./project-mapper";

export async function getProjectByLoggedUser(): Promise<
  { project: Project; likedByUser: boolean }[]
> {
  return instance.get<ProjectFeedItemResponse[]>("projects/me").then((res) =>
    res.data.map((item) => ({
      project: ProjectMapper.toDomain(item.project),
      likedByUser: item.likedByUser,
    })),
  );
}
