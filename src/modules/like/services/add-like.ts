import { instance } from "@modules/app/modules/http/domain/instance";
import type { AddLikeDto } from "@modules/like/dto/write/add-like";

export function addLike(props: AddLikeDto): Promise<number> {
  return instance
    .post<number>(`likes/${props.projectId}`)
    .then((res) => res.data);
}
