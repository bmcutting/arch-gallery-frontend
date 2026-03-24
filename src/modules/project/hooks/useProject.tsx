import { useState } from "react";
import { createProject } from "../services/create-project";
import type { Project } from "../domain/entities/project";
import { updateProject } from "../services/update-project";

interface Props {
  onClose?: () => void;
  project?: Project;
  userId: string;
}

export default function useProject({ onClose, userId, project }: Props) {
  const [title, setTitle] = useState(project?.title ? project.title : "");
  const [description, setDescription] = useState(
    project?.description ? project.description : "",
  );
  const [year, setYear] = useState<number>(
    project?.year ? project.year : new Date().getFullYear(),
  );
  const [imagesUrl, setImagesUrl] = useState<string[]>(
    project?.imagesUrl ? project.imagesUrl : [],
  );
  const [categories, setCategories] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProject({ title, year, description, userId, categories });

    if (onClose) onClose();
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!project?.id) {
      console.error("No project id provided for update");
      return;
    }

    updateProject({
      projectId: project?.id,
      title,
      year,
      description,
      categories,
    });

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
    handleEdit,
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
