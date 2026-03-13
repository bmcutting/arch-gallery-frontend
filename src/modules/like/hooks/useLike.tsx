import { useState } from "react";
import { addLike } from "../services/add-like";
import { removeLike } from "../services/remove-like";
import { addComment } from "../../comment/services/add-comment";

interface Props {
  projectId: string;
  initialLikes?: number;
  initiallyLiked?: boolean;
}

export default function useLike({
  projectId,
  initialLikes = 0,
  initiallyLiked = false,
}: Props) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [showComments, setShowComments] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [likedByUser, setLikedByUser] = useState(initiallyLiked);
  const [comment, setComment] = useState("");

  async function handleLike() {
    try {
      if (likedByUser) {
        const updatedLikes = await removeLike({ projectId });
        setLikesCount(updatedLikes);
        setLikedByUser(false);
      } else {
        const updatedLikes = await addLike({ projectId });
        setLikesCount(updatedLikes);
        setLikedByUser(true);
      }
    } catch {
      console.log("Error al alternar like");
    }
  }

  async function handleComment() {
    try {
      const updatedComment = await addComment({
        projectId: projectId,
        message: comment,
      });
      console.log(updatedComment);
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
    handleComment,
    setShowComments,
    likesCount,
    likedByUser,
  };
}
