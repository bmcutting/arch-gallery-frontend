import { instance } from "@modules/app/modules/http/domain/instance";
import type { RemoveLikeDto } from "@modules/like/dto/write/remove-like";

export function removeLike(props: RemoveLikeDto): Promise<number> {
  return instance
    .delete<number>(`likes/${props.projectId}`)
    .then((res) => res.data);
}
