import { instance } from "../../../app/modules/http/domain/instance";
import type { Success } from "../../dto/read/success";
import type { UpdateExperienceDto } from "../../dto/write/update-experience";

export function updateExperience(props: UpdateExperienceDto): Promise<Success> {
  return instance
    .put<Success>(`experiences/${props.userId}`, props)
    .then((data) => data.data);
}
