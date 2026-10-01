import { instance } from "@modules/app/modules/http/domain/instance";
import type { PaginationResult } from "@modules/app/modules/shared/domain/core/pagination-result";
import type { PaginationResponse } from "@modules/app/modules/shared/dto/read/pagination";
import { PaginationResultMapper } from "@modules/app/modules/shared/services/pagination-result-mapper";
import type { Project } from "@modules/project/domain/entities/project";
import type { ProjectResponse } from "@modules/project/dto/read/project";
import type { ProjectPaginationParams } from "@modules/project/dto/write/project-pagination-params";
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
