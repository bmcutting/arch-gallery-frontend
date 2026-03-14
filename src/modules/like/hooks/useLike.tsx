import { useState } from "react";
import { addLike } from "../services/add-like";
import { removeLike } from "../services/remove-like";
import { addComment } from "../../comment/services/add-comment";
import type { ProjectFeed } from "../../project/domain/entities/project-feed";
import { fetchComments } from "../services/fetch-comment";

interface Props {
  project: ProjectFeed;
}

export default function useLike({ project }: Props) {
  const [likesCount, setLikesCount] = useState(project.likes?.length ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [comments, setComments] = useState(project.comments ?? []);
  const [likedByUser, setLikedByUser] = useState(project.likedByUser);
  const [showDetail, setShowDetail] = useState(false);
  const [comment, setComment] = useState("");

  async function handleLike() {
    try {
      if (likedByUser) {
        const updatedLikes = await removeLike({ projectId: project.id });
        setLikesCount(updatedLikes);
        setLikedByUser(false);
      } else {
        const updatedLikes = await addLike({ projectId: project.id });
        setLikesCount(updatedLikes);
        setLikedByUser(true);
      }
    } catch {
      console.log("Error al alternar like");
    }
  }

  async function handleComment() {
    try {
      const totalComments = await addComment({
        projectId: project.id,
        message: comment,
      });

      const updatedComments = await fetchComments(project.id);
      setComments(updatedComments);

      setComment("");
    } catch {
      console.log("Error al alternar comentario");
    }
  }

  return {
    handleLike,
    comment,
    setComment,
    showTextarea,
    setShowTextarea,
    showComments,
    showDetail,
    comments,
    setComments,
    setShowDetail,
    handleComment,
    setShowComments,
    likesCount,
    likedByUser,
  };
}
