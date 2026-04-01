import { instance } from "../../../app/modules/http/domain/instance";
import type { Success } from "../../dto/read/success";
import type { UpdateSkillDto } from "../../dto/write/update-skill";

export function updateSkill(props: UpdateSkillDto): Promise<Success> {
  return instance
    .put<Success>(`skills/${props.userId}`, props)
    .then((data) => data.data);
}
