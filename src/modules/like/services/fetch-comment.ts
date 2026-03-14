import { instance } from "../../app/modules/http/domain/instance";
import type { CommentResponse } from "../../comment/dto/read/commentResponse";

export function fetchComments(projectId: string): Promise<CommentResponse[]> {
  return instance
    .get<CommentResponse[]>(`comments/${projectId}`)
    .then((res) => res.data);
}
