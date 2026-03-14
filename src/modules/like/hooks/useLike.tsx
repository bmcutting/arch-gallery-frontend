import { useState } from "react";
import { addLike } from "../services/add-like";
import { removeLike } from "../services/remove-like";
import type { ProjectFeed } from "../../project/domain/entities/project-feed";

interface Props {
  project: ProjectFeed;
}

export default function useLike({ project }: Props) {
  const [likesCount, setLikesCount] = useState(project.likes?.length ?? 0);
  const [likedByUser, setLikedByUser] = useState(project.likedByUser);

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

  return {
    likesCount,
    likedByUser,
    handleLike,
  };
}
