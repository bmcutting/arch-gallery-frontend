import { useRef, useState } from "react";
import { addComment } from "../../comment/services/add-comment";
import type { ProjectFeed } from "../../project/domain/entities/project-feed";
import { fetchComments } from "../../like/services/fetch-comment";

interface Props {
  project: ProjectFeed;
}

export default function useComment({ project }: Props) {
  const commentsContainerRef = useRef<HTMLDivElement | null>(null);
  const [comments, setComments] = useState(project.comments ?? []);
  const [showComments, setShowComments] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [comment, setComment] = useState("");

  async function handleComment() {
    try {
      await addComment({ projectId: project.id, message: comment });
      const updatedComments = await fetchComments(project.id);
      setComments(updatedComments);
      setComment("");

      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch {
      console.log("Error al alternar comentario");
    }
  }

  return {
    comments,
    showComments,
    setShowComments,
    showTextarea,
    setShowTextarea,
    comment,
    setComment,
    handleComment,
    commentsContainerRef,
  };
}
