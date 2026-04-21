import { instance } from "../../app/modules/http/domain/instance";
import type { PaginationResult } from "../../app/modules/shared/domain/core/pagination-result";
import type { PaginationResponse } from "../../app/modules/shared/dto/read/pagination";
import { PaginationResultMapper } from "../../app/modules/shared/services/pagination-result-mapper";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";
import type { ProjectPaginationParams } from "../dto/write/project-pagination-params";
import { ProjectMapper } from "./project-mapper";

export interface ProjectFeedItem {
  project: Project;
  likedByUser: boolean;
}

interface Props {
  controller?: AbortController;
  params?: ProjectPaginationParams;
}

export interface ProjectFeedItemResponse {
  project: ProjectResponse;
  likedByUser: boolean;
}

export async function getAllProjects({
  params,
  controller,
}: Props): Promise<PaginationResult<ProjectFeedItem>> {
  return instance
    .get<PaginationResponse<ProjectFeedItemResponse>>(`/projects`, {
      params,
      signal: controller?.signal,
    })
    .then((res) =>
      PaginationResultMapper.execute(res.data, (item) => ({
        project: ProjectMapper.toDomain(item.project),
        likedByUser: item.likedByUser,
      })),
    );
}
