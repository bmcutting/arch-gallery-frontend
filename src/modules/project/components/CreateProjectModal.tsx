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
    setTitle,
    setDescription,
    setYear,
    addCategory,
    removeCategory,
    updateCategory,
  } = useProject({ onClose, userId });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity mt-14">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FaFolderPlus className="text-accent text-2xl" />
          <h2 className="text-2xl font-bold text-secondary">Nuevo Proyecto</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput label="Título" required>
            <Input
              value={title}
              onChange={setTitle}
              onClear={() => setTitle("")}
              className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
            />
          </FormInput>

          <FormInput label="Descripción">
            <Textarea
              placeholder="Descripción"
              value={description}
              onChange={setDescription}
              maxChars={500}
              className="h-40 md:h-56 lg:h-64 px-3 py-2 text-sm md:text-base lg:text-lg 
                          rounded-md border border-gray-300 focus:ring-2 focus:ring-primary 
                          resize-none leading-relaxed"
            />
          </FormInput>

          <FormInput label="Año" required>
            <Input value={String(year)} onChange={(v) => setYear(Number(v))} />
          </FormInput>

          <FormInput label="Categorías (máx. 5)">
            <div className="space-y-3">
              {categories.map((cat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={cat}
                    onChange={(value) => updateCategory(index, value)}
                    placeholder="Ej: Urbanismo, Vivienda, Obra nueva..."
                    className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
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

          {/* Actions */}
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
