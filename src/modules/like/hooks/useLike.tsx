import { useState } from "react";
import { addLike } from "../services/add-like";
import { removeLike } from "../services/remove-like";

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
  const [likedByUser, setLikedByUser] = useState(initiallyLiked);

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

  return { handleLike, showComments, setShowComments, likesCount, likedByUser };
}
