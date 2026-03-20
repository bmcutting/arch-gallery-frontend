import { useState } from "react";
import { addLike } from "../services/add-like";
import { removeLike } from "../services/remove-like";
import type { Project } from "../../project/domain/entities/project";

interface Props {
  project: Project;
  likedByUser: boolean;
}

export default function useLike({ project, likedByUser: initialLiked }: Props) {
  const [likesCount, setLikesCount] = useState(project.likes?.length ?? 0);
  const [liked, setLiked] = useState(initialLiked);

  async function handleLike() {
    try {
      if (liked) {
        const updatedLikes = await removeLike({ projectId: project.id });
        setLikesCount(updatedLikes);
        setLiked(false);
      } else {
        const updatedLikes = await addLike({ projectId: project.id });
        setLikesCount(updatedLikes);
        setLiked(true);
      }
    } catch {
      console.log("Error al alternar like");
    }
  }

  return {
    likesCount,
    liked,
    handleLike,
  };
}
