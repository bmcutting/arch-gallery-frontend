import { FaPlus, FaTrash } from "react-icons/fa";
import Button from "../../../app/modules/ui/components/Button/Button";
import Input from "../../../app/modules/ui/components/Input/Input";
import type { Skill } from "../../domain/entities/skill";
import type { User } from "../../domain/entities/user";

interface Props {
  skills: Skill[];
  handleChange: (field: keyof User, value: string) => void;
}

export default function SkillSection({ skills, handleChange }: Props) {
  const LEVEL_OPTIONS = [
    { value: "beginner", label: "Básico" },
    { value: "intermediate", label: "Intermedio" },
    { value: "advanced", label: "Avanzado" },
    { value: "expert", label: "Experto" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-2">
        {skills.length === 0 && (
          <p className="text-black italic text-sm">
            No hay habilidades añadidas.
          </p>
        )}
        {skills.map((skill) => (
          <div key={skill.id} className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-45 ">
              <Input
                placeholder="Nombre"
                value={skill.name}
                onChange={(value: string) => handleChange("skills", value)}
                full
              />
            </div>
            <div className="w-40">
              <select
                value={skill.level || ""}
                className="w-full px-3 py-2 text-sm md:text-base rounded-md border border-border 
                bg-card focus:ring-2 focus:ring-primary "
              >
                <option value="">Sin nivel</option>
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => console.log(skill.name)}
              className="p-2 text-primary/80 hover:text-primary hover:bg-primary/30 rounded-md transition-colors"
              title="Eliminar habilidad"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <Button size="sm" className="mt-4">
        <FaPlus className="mr-1" /> Añadir habilidad
      </Button>
    </div>
  );
}
