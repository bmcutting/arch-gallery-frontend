import { useEffect, useState } from "react";
import type { User } from "../../../modules/user/domain/entities/user";
import useProfile from "../../Profile/hooks/useProfile";
import { updateUser } from "../../../modules/user/services/update-user";
import { UserMapperDto } from "../../../modules/user/services/user-mapper-dto";

export default function useUpdateUser() {
  const user = useProfile();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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

  const [touched, setTouched] = useState({
    email: false,
    firstName: false,
    userName: false,
    lastName: false,
  });

  const cleanFormData = (data: User): User => ({
    ...data,
    languages: (data.languages ?? []).filter((lang) => lang.trim() !== ""),
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

    updateUser(UserMapperDto.execute(cleaned))
      .then((data) => {
        if (data.success === true) {
          setStatus("success");
          setTimeout(() => setStatus("idle"), 5000);
        } else {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 5000);
        }
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
    setFormData,
  };
}
