import { useState } from "react";
import { createProject } from "@modules/project/services/create-project";
import type { Project } from "@modules/project/domain/entities/project";
import { updateProject } from "@modules/project/services/update-project";

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
  const [categories, setCategories] = useState<string[]>(
    project?.categories?.map(c => c.name) ?? []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProject({ title, year, description, userId, categories })
      .then(() => onClose?.())
      .catch((err) => console.error("Error creating project", err));
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!project?.id) {
      console.error("No project id provided for update");
      return;
    }

    updateProject({
      projectId: project.id,
      title,
      year,
      description,
      categories,
    })
      .then(() => onClose?.())
      .catch((err) => console.error("Error updating project", err));
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
    title: { value: title, onChange: setTitle },
    description: { value: description, onChange: setDescription },
    year: { value: String(year), onChange: (v: string) => setYear(Number(v)) },
    imagesUrl: { value: imagesUrl, onChange: setImagesUrl },
    categories,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory,
  };
}
