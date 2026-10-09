import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import Textarea from "@modules/app/modules/ui/components/TextArea/TextArea";
import type { ProfileForm } from "@modules/user/domain/form/profile-form";

interface Props {
  formData: ProfileForm;
  handleChange: (field: keyof ProfileForm, value: string) => void;
}

export default function BioSection({ formData, handleChange }: Props) {
  return (
    <section>
      <FormInput label="Descripción" size="lg">
        <Textarea
          placeholder="Escribe una pequeña descripción de tí..."
          inputValue={{ value: formData.shortBio, onChange: (value: string) => handleChange("shortBio", value) }}
          maxChars={200}
        />
      </FormInput>

      <FormInput label="Biografía profesional" size="lg">
        <Textarea
          placeholder="Escribe tu biografía profesional..."
          inputValue={{ value: formData.longBio, onChange: (value: string) => handleChange("longBio", value) }}
          maxChars={500}
        />
      </FormInput>
    </section>
  );
}
