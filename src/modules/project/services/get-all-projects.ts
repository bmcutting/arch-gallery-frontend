import { instance } from "../../app/modules/http/domain/instance";
import type { PaginationResult } from "../../app/modules/shared/domain/core/pagination-result";
import { PaginationResultMapper } from "../../app/modules/shared/services/pagination-result-mapper";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";
import type { ProjectPaginationParams } from "../dto/write/project-pagination-params";
import { ProjectMapper } from "./project-mapper";

interface Props {
  controller?: AbortController;
  params?: ProjectPaginationParams;
}

export async function getAllProjects({
  params,
  controller,
}: Props): Promise<PaginationResult<Project>> {
  return instance
    .get<PaginationResult<ProjectResponse>>(`/projects`, {
      params: params,
      signal: controller?.signal,
    })
    .then((res) => {
      return PaginationResultMapper.execute(res.data, ProjectMapper.toDomain);
    });
}
