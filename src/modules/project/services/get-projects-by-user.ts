import { instance } from "../../app/modules/http/domain/instance";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";
import type { ProjectFeedItemResponse } from "./get-all-projects";
import { ProjectMapper } from "./project-mapper";

/**
 * Trae los proyectos de un usuario específico por su id.
 * Backend: GET /projects/user/{userId}
 *
 * El endpoint puede devolver items con forma { project, likedByUser }
 * (igual que /projects/me) o proyectos planos; se contemplan ambos casos.
 */
export async function getProjectsByUserId(
  userId: string,
): Promise<{ project: Project; likedByUser: boolean }[]> {
  return instance
    .get<(ProjectFeedItemResponse | ProjectResponse)[]>(
      `projects/user/${userId}`,
    )
    .then((res) =>
      res.data.map((item) => {
        const hasWrapper = "project" in item;
        const projectResponse = hasWrapper
          ? (item as ProjectFeedItemResponse).project
          : (item as ProjectResponse);
        const likedByUser = hasWrapper
          ? (item as ProjectFeedItemResponse).likedByUser
          : false;

        return {
          project: ProjectMapper.toDomain(projectResponse),
          likedByUser,
        };
      }),
    );
}
