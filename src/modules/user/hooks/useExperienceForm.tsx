import { useState } from "react";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import type { Experience } from "@modules/user/domain/entities/experience";
import { ExperienceType } from "@modules/user/domain/enums/experience";
import { ExperienceValidator } from "@modules/user/domain/validator/experience/experience-validator";
import type { FormSubmit } from "@modules/app/modules/ui/components/Form/domain/form-submit";

type ExperienceFormState = Omit<Experience, "id" | "startYear"> & {
  startYear?: number;
};

interface Props {
  experience: Omit<Experience, "id"> | null;
  onSave: (expData: Omit<Experience, "id">) => void;
}

export default function useExperienceForm({ experience, onSave }: Props) {
  const { handleClose } = useModal();

  const [form, setForm] = useState<ExperienceFormState>({
    type: experience?.type ?? ExperienceType.WORK,
    title: experience?.title ?? "",
    institutionOrCompany: experience?.institutionOrCompany ?? "",
    description: experience?.description ?? "",
    startYear: experience?.startYear ?? new Date().getFullYear(),
    endYear: experience?.endYear,
    isCurrent: experience?.isCurrent ?? false,
  });

  const handleSubmit = ({ setErrors }: FormSubmit) => {
    new ExperienceValidator(form).execute({
      success: () => {
        onSave({ ...form, startYear: form.startYear as number });
        handleClose();
      },
      error: setErrors,
    });
  };

  return { form, setForm, handleSubmit };
}
