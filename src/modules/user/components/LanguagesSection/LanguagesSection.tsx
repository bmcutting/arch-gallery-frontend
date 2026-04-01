import Button from "../../../app/modules/ui/components/Button/Button";
import Input from "../../../app/modules/ui/components/Input/Input";
import type { User } from "../../domain/entities/user";

interface Props {
  formData: User;
  updateLanguage: (index: number, value: string) => void;
  removeLanguage: (index: number) => void;
  addLanguage: () => void;
}

export default function LanguageSection({
  formData,
  updateLanguage,
  removeLanguage,
  addLanguage,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="md:grid md:grid-cols-2 gap-4">
        {formData.languages?.map((lang, index) => (
          <div key={index} className="flex items-center gap-3">
            <Input
              value={lang}
              onChange={(value) => updateLanguage(index, value)}
              placeholder="Ej: Español, Inglés, Francés..."
              className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary"
            />
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              title="Eliminar idioma"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        onClick={addLanguage}
        size="base"
        full
        color="primary"
      >
        <span className="text-lg">+</span> Añadir idioma
      </Button>
    </div>
  );
}
