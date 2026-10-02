import { useState } from "react";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import type { Experience } from "@modules/user/domain/entities/experience";
import { ExperienceType } from "@modules/user/domain/enums/experience";

interface Props {
  experience: Experience | null;
  onSave: (expData: Omit<Experience, "id">) => void;
}

export default function useExperienceForm({ experience, onSave }: Props) {
  const { handleClose } = useModal();

  const [form, setForm] = useState<Omit<Experience, "id">>({
    type: experience?.type ?? ExperienceType.WORK,
    title: experience?.title ?? "",
    institutionOrCompany: experience?.institutionOrCompany ?? "",
    description: experience?.description ?? "",
    startYear: experience?.startYear ?? new Date().getFullYear(),
    endYear: experience?.endYear,
    isCurrent: experience?.isCurrent ?? false,
  });

  const [touched, setTouched] = useState({
    type: false,
    title: false,
    institutionOrCompany: false,
    startYear: false,
  });

  const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      type: !form.type,
      title: !form.title,
      institutionOrCompany: !form.institutionOrCompany,
      startYear: !form.startYear,
    });

    if (!form.title.trim() || !form.institutionOrCompany.trim()) {
      return;
    }

    onSave(form);
    handleClose();
  };

  return { form, setForm, handleSubmit, handleTouched, touched };
}
