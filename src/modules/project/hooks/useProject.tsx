import { useState } from "react";
import type { Category } from "../../category/domain/entities/category";
import { createProject } from "../services/create-project";

interface Props {
  onClose?: () => void;
  userId: string;
}

export default function useProject({ onClose, userId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProject({ title, year, description, userId });

    if (onClose) onClose();
  };

  return {
    handleSubmit,
    title,
    description,
    year,
    imagesUrl,
    categories,
    setTitle,
    setDescription,
    setYear,
    setImagesUrl,
    setCategories,
  };
}
