import Button from "@modules/app/modules/ui/components/Button/Button";
import Input from "@modules/app/modules/ui/components/Input/Input";
import type { ProfileFormValues } from "@modules/user/domain/forms/profile-form";

interface Props {
  formData: ProfileFormValues;
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
      <div className="md:grid md:grid-cols-2">
        {formData.languages?.map((lang, index) => (
          <div key={index} className="flex items-center gap-3 mt-2">
            <Input
              inputValue={{ value: lang, onChange: (value) => updateLanguage(index, value) }}
              placeholder="Ej: Español, Inglés, Francés..."
            />
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="p-2 text-error hover:text-error/80 hover:bg-error/10 rounded-md transition-colors"
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
