import { useState } from "react";
import { addLike } from "../services/add-like";

interface Props {
  projectId: string;
  initialLikes?: number;
}

interface Props {
  projectId: string;
  initialLikes?: number;
}

export default function useLike({ projectId, initialLikes = 0 }: Props) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [showComments, setShowComments] = useState(false);

  async function handleLike() {
    try {
      const updatedLikes = await addLike({ projectId });
      setLikesCount(updatedLikes);
    } catch {
      console.log("Error al dar like");
    }
  }

  return { handleLike, showComments, setShowComments, likesCount };
}
