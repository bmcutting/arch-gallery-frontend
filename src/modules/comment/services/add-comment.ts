import { instance } from "../../app/modules/http/domain/instance";
import type { AddCommentDto } from "../dto/write/add-comment";

export function addComment(props: AddCommentDto): Promise<number> {
  return instance
    .post<number>(`comments/${props.projectId}`, props)
    .then((res) => res.data);
}
