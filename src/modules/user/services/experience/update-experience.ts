import { instance } from "@modules/app/modules/http/domain/instance";
import type { Success } from "@modules/user/dto/read/success";
import type { UpdateExperienceDto } from "@modules/user/dto/write/update-experience";

export function updateExperience(props: UpdateExperienceDto): Promise<Success> {
  return instance
    .put<Success>(`experiences/${props.userId}`, props)
    .then((data) => data.data);
}
