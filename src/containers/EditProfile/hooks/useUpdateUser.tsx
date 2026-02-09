import { useEffect, useState } from "react";
import type { User } from "../../../modules/user/domain/entities/user";
import useProfile from "../../Profile/hooks/useProfile";

export default function useUpdateUser() {
  const user = useProfile();

  const [formData, setFormData] = useState<User>({
    id: user?.id ?? "",
    email: user?.email ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    userName: user?.userName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    bio: user?.bio ?? "",
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

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ ...user, languages: user.languages ?? [] });
    }
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Datos a guardar:", formData);
  };

  const [bio, setBio] = useState(formData.bio ?? user?.bio ?? "");
  const maxChars = 500;
  const handleBioChange = (value: string) => {
    setBio(value);
    handleChange("bio", value);
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

  return {
    formData,
    bio,
    maxChars,
    handleBioChange,
    handleSave,
    handleChange,
    addLanguage,
    removeLanguage,
    updateLanguage,
  };
}
