import { instance } from "@modules/app/modules/http/domain/instance";
import type { Experience } from "@modules/user/domain/entities/experience";
import type { ExperienceResponse } from "@modules/user/dto/read/experience";
import type { UpdateExperienceDto } from "@modules/user/dto/write/update-experience";
import { ExperienceMapper } from "./experience-mapper";

export function updateExperience(
  experienceId: string,
  props: UpdateExperienceDto,
): Promise<Experience> {
  return instance
    .patch<ExperienceResponse>(`experiences/${experienceId}`, props)
    .then((data) => ExperienceMapper.toDomain(data.data));
}
