import { FaTimes } from "react-icons/fa";
import type { Experience } from "../../domain/entities/experience";
import useExperienceForm from "../../hooks/useExperienceForm";
import Input from "../../../app/modules/ui/components/Input/Input";
import FormInput from "../../../app/modules/ui/components/Form/FormInput";
import Textarea from "../../../app/modules/ui/components/TextArea/TextArea";
import Button from "../../../app/modules/ui/components/Button/Button";
import type { ExperienceType } from "../../domain/enums/experience";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experience?: Experience | null;
  onSave: (expData: Omit<Experience, "id">) => void;
}

export default function ExperienceFormModal({
  isOpen,
  onClose,
  experience,
  onSave,
}: Props) {
  const { form, setForm, handleSubmit } = useExperienceForm({
    isOpen,
    onClose,
    experience,
    onSave,
  });

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center bg-black/5">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-semibold">
            {experience ? "Editar experiencia" : "Añadir experiencia"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <FaTimes />
          </button>
        </div>
        <div onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as ExperienceType })
              }
              className="w-full px-3 py-2 rounded-md border border-border"
            >
              <option value="Work">Experiencia profesional</option>
              <option value="Education">Educación</option>
            </select>
          </div>
          <FormInput label="Tìtulo">
            <Input
              placeholder="Ej: Arquitecto Senior, Máster en Arquitectura"
              value={form.title}
              onChange={(val) => setForm({ ...form, title: val })}
              required
            />
          </FormInput>
          <FormInput label="Institución/Empresa">
            <Input
              placeholder="Nombre de la empresa o institución"
              value={form.institutionOrCompany}
              onChange={(val) =>
                setForm({ ...form, institutionOrCompany: val })
              }
              required
            />
          </FormInput>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Año de inicio"
              className="block text-sm font-medium mb-1"
            >
              <Input
                placeholder="Nombre de la empresa o institución"
                value={form.startYear.toString()}
                onChange={(val) =>
                  setForm({ ...form, startYear: parseInt(val) })
                }
                required
              />
            </FormInput>
            <div>
              <FormInput label="Año de fin">
                <div>
                  <Input
                    value={form.endYear?.toString() || ""}
                    onChange={(val) =>
                      setForm({
                        ...form,
                        endYear: val ? parseInt(val) : undefined,
                      })
                    }
                    disabled={form.isCurrent}
                    placeholder="Año"
                  />
                  <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={form.isCurrent}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isCurrent: e.target.checked,
                          endYear: undefined,
                        })
                      }
                    />
                    Actualmente
                  </label>
                </div>
              </FormInput>
            </div>
          </div>
          <FormInput label="Descripción (opcional)">
            <Textarea
              placeholder="Describe tus responsabilidades o logros"
              value={form.description}
              onChange={(val) => setForm({ ...form, description: val })}
            />
          </FormInput>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" size="sm" onClick={() => onSave(form)}>
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
