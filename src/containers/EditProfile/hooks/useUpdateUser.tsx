import { useEffect, useState } from "react";
import { updateUser } from "@modules/user/services/user/update-user";
import { UserMapperDto } from "@modules/user/services/user/user-mapper-dto";
import { useUserContext } from "@modules/user/context/useUserContext";
import type { ProfileForm } from "@modules/user/domain/form/profile-form";
import useLanguagesForm from "@modules/user/hooks/useLanguagesForm";
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
  });
  const languagesForm = useLanguagesForm(user?.languages);
  const experiencesForm = useExperiencesForm(user?.experiences);
  const skillsForm = useSkillsForm(user?.skills);
  const { onSet: setLanguages } = languagesForm;
  const { onSet: setExperiences } = experiencesForm;
  const { onSet: setSkills } = skillsForm;

  const [touched, setTouched] = useState({
    email: false,
    firstName: false,
    userName: false,
    lastName: false,
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(user);
      setLanguages(user.languages ?? []);
      setExperiences(user.experiences ?? []);
      setSkills(user.skills ?? []);
    }
  }, [user, setLanguages, setExperiences, setSkills]);

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

    updateUser(formData.id, {
      ...UserMapperDto.execute(formData),
      languages: languagesForm.dto(),
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
    languagesForm: languagesForm.form,
    experiencesForm: experiencesForm.form,
    skillsForm: skillsForm.form,
    setFormData,
  };
}
