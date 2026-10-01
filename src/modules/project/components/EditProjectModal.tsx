import { FaFolderOpen } from "react-icons/fa6";
import type { Project } from "@modules/project/domain/entities/project";
import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import Input from "@modules/app/modules/ui/components/Input/Input";
import useProject from "@modules/project/hooks/useProject";
import Textarea from "@modules/app/modules/ui/components/TextArea/TextArea";
import Button from "@modules/app/modules/ui/components/Button/Button";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function EditProjectModal({ project, onClose }: Props) {
  const {
    handleEdit,
    title,
    description,
    year,
    categories,
    addCategory,
    removeCategory,
    updateCategory,
  } = useProject({ onClose, userId: "", project });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 animate-fadeIn">
        <div className="flex items-center gap-2 mb-6">
          <FaFolderOpen className="text-accent text-2xl" />
          <h2 className="text-2xl font-bold text-secondary">Editar Proyecto</h2>
        </div>

        <form onSubmit={handleEdit} className="space-y-5">
          <FormInput label="Título" required>
            <Input
              inputValue={title}
              onClear={() => title.onChange("")}
            />
          </FormInput>

          <FormInput label="Descripción">
            <Textarea
              placeholder="Descripción"
              inputValue={description}
              maxChars={500}
            />
          </FormInput>

          <FormInput label="Año" required>
            <Input inputValue={year} />
          </FormInput>

          <FormInput label="Categorías (máx. 5)">
            <div className="space-y-3">
              {categories.map((cat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    inputValue={{ value: cat, onChange: (value) => updateCategory(index, value) }}
                    placeholder="Ej: Urbanismo, Vivienda, Obra nueva..."
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="p-2 text-error hover:text-error/80 hover:bg-error/10 rounded-md transition-colors"
                    title="Eliminar categoría"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addCategory}
                size="base"
                full
                color="primary"
              >
                <span className="text-lg">+</span> Añadir categoría
              </Button>
            </div>
          </FormInput>

          <div className="flex justify-center gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              size="lg"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-muted transition"
            >
              Cancelar
            </Button>
            <Button
              size="lg"
              type="submit"
              className="px-4 py-2 border rounded-lg hover:bg-muted transition"
              onClick={() => handleEdit}
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
