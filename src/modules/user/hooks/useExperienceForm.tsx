import { useEffect, useState } from "react";
import type { Experience } from "../domain/entities/experience";
import { ExperienceType } from "../domain/enums/experience";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experience?: Experience | null;
  onSave: (expData: Omit<Experience, "id">) => void;
}

export default function useExperienceForm({
  isOpen,
  onClose,
  experience,
  onSave,
}: Props) {
  const [form, setForm] = useState<Omit<Experience, "id">>({
    type: ExperienceType.WORK,
    title: "",
    institutionOrCompany: "",
    description: "",
    startYear: new Date().getFullYear(),
    endYear: undefined,
    isCurrent: false,
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

  useEffect(() => {
    if (experience) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        type: experience.type,
        title: experience.title,
        institutionOrCompany: experience.institutionOrCompany,
        description: experience.description || "",
        startYear: experience.startYear,
        endYear: experience.endYear,
        isCurrent: experience.isCurrent || false,
      });
      setTouched({
        type: false,
        title: false,
        institutionOrCompany: false,
        startYear: false,
      });
    } else {
      setForm({
        type: ExperienceType.WORK,
        title: "",
        institutionOrCompany: "",
        description: "",
        startYear: new Date().getFullYear(),
        endYear: undefined,
        isCurrent: false,
      });
      setTouched({
        type: false,
        title: false,
        institutionOrCompany: false,
        startYear: false,
      });
    }
  }, [experience, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTouched = { ...touched };
    if (!form.type) newTouched.type = true;
    if (!form.title) newTouched.title = true;
    if (!form.institutionOrCompany) newTouched.institutionOrCompany = true;
    if (!form.startYear) newTouched.startYear = true;
    setTouched(newTouched);

    if (!form.title.trim() || !form.institutionOrCompany.trim()) {
      return;
    }

    onSave(form);
    onClose();
  };

  return { form, setForm, handleSubmit, handleTouched, touched };
}
