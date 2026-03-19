import { useState } from "react";
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
  const [categories, setCategories] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProject({ title, year, description, userId, categories });

    if (onClose) onClose();
  };

  const addCategory = () => {
    if (categories.length < 5) {
      setCategories((prev) => [...prev, ""]);
    }
  };

  const removeCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, value: string) => {
    setCategories((prev) => {
      const newCats = [...prev];
      newCats[index] = value;
      return newCats;
    });
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
    addCategory,
    updateCategory,
    removeCategory,
  };
}
