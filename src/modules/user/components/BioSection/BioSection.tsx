import FormInput from "../../../app/modules/ui/components/Form/FormInput";
import Textarea from "../../../app/modules/ui/components/TextArea/TextArea";
import type { User } from "../../domain/entities/user";

interface Props {
  formData: User;
  handleChange: (field: keyof User, value: string) => void;
}

export default function BioSection({ formData, handleChange }: Props) {
  return (
    <section>
      <FormInput label="Descripción" size="lg">
        <Textarea
          placeholder="Escribe una pequeña descripción de tí..."
          value={formData.shortBio}
          onChange={(value: string) => handleChange("shortBio", value)}
          maxChars={200}
          className="h-40 md:h-56 lg:h-64 px-3 py-2 text-sm md:text-base lg:text-lg 
                 rounded-md border border-border focus:ring-2 focus:ring-primary
                 resize-none leading-relaxed"
        />
      </FormInput>

      <FormInput label="Biografía profesional" size="lg">
        <Textarea
          placeholder="Escribe tu biografía profesional..."
          value={formData.longBio}
          onChange={(value: string) => handleChange("longBio", value)}
          maxChars={500}
          className="h-40 md:h-56 lg:h-64 px-3 py-2 text-sm md:text-base lg:text-lg 
                 rounded-md border border-border focus:ring-2 focus:ring-primary
                 resize-none leading-relaxed"
        />
      </FormInput>
    </section>
  );
}
