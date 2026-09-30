import { FaFolderPlus } from "react-icons/fa";
import FormInput from "../../app/modules/ui/components/Form/FormInput";
import Input from "../../app/modules/ui/components/Input/Input";
import Textarea from "../../app/modules/ui/components/TextArea/TextArea";
import Button from "../../app/modules/ui/components/Button/Button";
import useProject from "../hooks/useProject";

interface Props {
  onClose: () => void;
  userId: string;
}

export default function CreateProjectModal({ onClose, userId }: Props) {
  const {
    handleSubmit,
    title,
    description,
    year,
    categories,
    addCategory,
    removeCategory,
    updateCategory,
  } = useProject({ onClose, userId });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity mt-14 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
        <div className="flex items-center gap-2 mb-6">
          <FaFolderPlus className="text-accent text-2xl" />
          <h2 className="text-2xl font-bold text-secondary">Nuevo Proyecto</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              onClick={() => handleSubmit}
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
