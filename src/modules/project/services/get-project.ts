import { instance } from "../../app/modules/http/domain/instance";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";
import { ProjectMapper } from "./project-mapper";

export interface ProjectFeedItem {
  project: ProjectResponse;
  likedByUser: boolean;
}

export async function getProjectByLoggedUser(): Promise<
  { project: Project; likedByUser: boolean }[]
> {
  return instance.get<ProjectFeedItem[]>("projects/me").then((res) =>
    res.data.map((item) => ({
      project: ProjectMapper.toDomain(item.project),
      likedByUser: item.likedByUser,
    })),
  );
}
