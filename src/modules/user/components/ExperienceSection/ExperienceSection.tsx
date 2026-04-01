import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../../../app/modules/ui/components/Button/Button";
import type { Experience } from "../../domain/entities/experience";

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  return (
    <div className="space-y-4">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {experiences.length === 0 && (
          <p className="text-black italic text-sm">
            No hay experiencias añadidas.
          </p>
        )}
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow mt-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-black">{exp.institutionOrCompany}</p>
                <p className="text-sm text-black mt-1">{exp.startYear}</p>
                {exp.description && (
                  <p className="text-sm text-black mt-2 line-clamp-2">
                    {exp.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  type="button"
                  onClick={() => console.log("editar")}
                  className="p-2 text-primary/80 hover:text-primary rounded-md"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={() => console.log("eliminar")}
                  title="Eliminar"
                  className="p-2 text-primary/80 hover:text-primary rounded-md"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button size="sm">
        <FaPlus className="mr-1" /> Añadir experiencia
      </Button>
    </div>
  );
}
