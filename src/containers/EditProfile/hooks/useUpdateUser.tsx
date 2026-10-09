import { useEffect, useState } from "react";
import { updateUser } from "@modules/user/services/user/update-user";
import { UserMapperDto } from "@modules/user/services/user/user-mapper-dto";
import { useUserContext } from "@modules/user/context/useUserContext";
import type { ProfileForm } from "@modules/user/domain/form/profile-form";
import useExperiencesForm from "@modules/user/hooks/useExperiencesForm";
import useSkillsForm from "@modules/user/hooks/useSkillsForm";

export default function useUpdateUser() {
  const { user, setUser } = useUserContext();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState<ProfileForm>({
    id: user?.id ?? "",
    email: user?.email ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    userName: user?.userName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    shortBio: user?.shortBio ?? "",
    longBio: user?.longBio ?? "",
    profileImageUrl: user?.profileImageUrl ?? "",
    website: user?.website ?? "",
    location: user?.location ?? "",
    experienceYears: user?.experienceYears ?? 0,
    specialization: user?.specialization ?? "",
    instagramUrl: user?.instagramUrl ?? "",
    twitterUrl: user?.twitterUrl ?? "",
    linkedinUrl: user?.linkedinUrl ?? "",
    languages: user?.languages ?? [],
  });
  const experiencesForm = useExperiencesForm(user?.experiences);
  const skillsForm = useSkillsForm(user?.skills);
  const { onSet: setExperiences } = experiencesForm;
  const { onSet: setSkills } = skillsForm;

  const [touched, setTouched] = useState({
    email: false,
    firstName: false,
    userName: false,
    lastName: false,
  });

  const cleanFormData = (data: ProfileForm): ProfileForm => ({
    ...data,
    languages: (data.languages ?? []).filter((lang) => lang.trim() !== ""),
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ ...user, languages: user.languages ?? [] });
      setExperiences(user.experiences ?? []);
      setSkills(user.skills ?? []);
    }
  }, [user, setExperiences, setSkills]);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newTouched = { ...touched };
    if (!formData.email) newTouched.email = true;
    if (!formData.firstName) newTouched.firstName = true;
    if (!formData.lastName) newTouched.lastName = true;
    if (!formData.userName) newTouched.userName = true;
    setTouched(newTouched);

    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.userName
    ) {
      return;
    }

    const cleaned = cleanFormData(formData);

    updateUser(cleaned.id, {
      ...UserMapperDto.execute(cleaned),
      skills: skillsForm.dto(),
      experiences: experiencesForm.dto(),
    })
      .then((updated) => {
        setUser(updated);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), ""],
    }));
  };

  const removeLanguage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateLanguage = (index: number, value: string) => {
    const newLanguages = [...(formData.languages || [])];
    newLanguages[index] = value;
    setFormData((prev) => ({
      ...prev,
      languages: newLanguages,
    }));
  };

  const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  return {
    formData,
    status,
    touched,
    handleSave,
    handleChange,
    handleTouched,
    addLanguage,
    removeLanguage,
    updateLanguage,
    experiencesForm: experiencesForm.form,
    skillsForm: skillsForm.form,
    setFormData,
  };
}
