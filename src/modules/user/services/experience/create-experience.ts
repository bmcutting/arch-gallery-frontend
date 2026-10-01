import { instance } from "@modules/app/modules/http/domain/instance";
import type { CreateExperienceDto } from "@modules/user/dto/write/create-experience";

export function createExperience(props: CreateExperienceDto): Promise<string> {
  return instance.post<string>("experiences", props).then((data) => data.data);
}
