import { FaFolderPlus } from "react-icons/fa";
import FormModal from "@modules/app/modules/modal/components/FormModal/FormModal";
import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import Input from "@modules/app/modules/ui/components/Input/Input";
import Textarea from "@modules/app/modules/ui/components/TextArea/TextArea";
import Button from "@modules/app/modules/ui/components/Button/Button";
import useProject from "@modules/project/hooks/useProject";

interface Props {
  userId: string;
  refetch: () => void;
}

export default function CreateProject({ userId, refetch }: Props) {
  const {
    handleSubmit,
    title,
    description,
    year,
    categories,
    addCategory,
    removeCategory,
    updateCategory,
  } = useProject({ userId, refetch });

  return (
    <FormModal
      title="Nuevo Proyecto"
      icon={<FaFolderPlus className="text-accent text-2xl" />}
      onSubmit={handleSubmit}
      width={512}
    >
      <FormInput label="Título" required>
        <Input inputValue={title} onClear={() => title.onChange("")} />
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
                inputValue={{
                  value: cat,
                  onChange: (value) => updateCategory(index, value),
                }}
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
    </FormModal>
  );
}
