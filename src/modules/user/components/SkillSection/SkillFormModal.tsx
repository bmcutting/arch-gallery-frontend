import { FaTimes } from "react-icons/fa";
import Button from "../../../app/modules/ui/components/Button/Button";
import Input from "../../../app/modules/ui/components/Input/Input";
import type { Level } from "../../domain/enums/level";
import FormInput from "../../../app/modules/ui/components/Form/FormInput";
import useSkillForm from "../../hooks/useSkillForm";
import type { Skill } from "../../domain/entities/skill";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill | null; // null para nueva
  onSave: (skillData: Omit<Skill, "id">) => void;
}

export default function SkillFormModal({
  isOpen,
  onClose,
  skill,
  onSave,
}: Props) {
  const { form, setForm, handleSubmit, LEVEL_OPTIONS } = useSkillForm({
    isOpen,
    onClose,
    skill,
    onSave,
  });

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-semibold">
            {skill ? "Editar habilidad" : "Añadir habilidad"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <FormInput label="Nombre de la habilidad">
            <Input
              placeholder="Ej: AutoCAD, Revit, Photoshop"
              value={form.name}
              onChange={(val) => setForm({ ...form, name: val })}
              required
              full
            />
          </FormInput>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nivel (opcional)
            </label>
            <select
              value={form.level || ""}
              onChange={(e) =>
                setForm({ ...form, level: e.target.value as Level })
              }
              className="w-full px-3 py-2 rounded-md border border-border"
            >
              <option value="">Sin nivel</option>
              {LEVEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" size="sm" onClick={() => onSave(form)}>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
