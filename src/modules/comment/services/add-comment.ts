import { instance } from "@modules/app/modules/http/domain/instance";
import type { AddCommentDto } from "@modules/comment/dto/write/add-comment";

export function addComment(props: AddCommentDto): Promise<number> {
  return instance
    .post<number>(`comments/${props.projectId}`, props)
    .then((res) => res.data);
}
