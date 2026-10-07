import Image from "@modules/app/modules/ui/components/Image/Image";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { Project } from "@modules/project/domain/entities/project";
import Modal from "@modules/app/modules/modal/components/Modal/Modal";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import { getProjectById } from "@modules/project/services/get-project-by-id";

interface Props {
  projectId: string;
}

export default function ViewProject({ projectId }: Props) {
  const { handleClose } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [project, setProject] = useState<Project>();

   useEffect(() => {
    getProjectById({ projectId })
      .then((data) => {
        setProject(data);
      })
      .catch(() => {
        console.error("Error al cargar el proyecto");
      });
  }, [projectId]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (project?.imagesUrl?.length ?? 1) - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === (project?.imagesUrl?.length ?? 1) - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Modal width={896}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{project?.title}</h2>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <FaTimes />
          </button>
        </div>

        <p className="text-foreground mb-4">{project?.description}</p>

        {/* Carrusel */}
        {project?.imagesUrl && project.imagesUrl.length > 0 && (
          <div className="relative flex items-center justify-center mb-6">
            <button
              onClick={handlePrev}
              className="absolute left-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              <FaChevronLeft />
            </button>
            <Image
              src={project.imagesUrl[currentIndex]}
              alt={`Foto ${currentIndex + 1}`}
              className="w-full max-h-[400px] object-cover rounded-md"
            />
            <button
              onClick={handleNext}
              className="absolute right-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mb-4">
          {project?.imagesUrl?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {project?.categories?.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  );
}
