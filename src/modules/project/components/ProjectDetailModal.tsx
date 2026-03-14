import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import type { Project } from "../domain/entities/project";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (project.imagesUrl?.length ?? 1) - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === (project.imagesUrl?.length ?? 1) - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <p className="text-gray-700 mb-4">{project.description}</p>

        {/* Carrusel */}
        {project.imagesUrl && project.imagesUrl.length > 0 && (
          <div className="relative flex items-center justify-center mb-6">
            <button
              onClick={handlePrev}
              className="absolute left-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              <FaChevronLeft />
            </button>
            <img
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
          {project.imagesUrl?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {project.categories?.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
