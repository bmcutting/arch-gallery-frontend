import { instance } from "@modules/app/modules/http/domain/instance";
import type { CreateSkillDto } from "@modules/user/dto/write/create-skill";

export function createSkill(props: CreateSkillDto): Promise<string> {
  return instance.post<string>("skills", props).then((data) => data.data);
}
