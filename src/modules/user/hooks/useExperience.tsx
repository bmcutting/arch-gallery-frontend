import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify";
import type { Experience } from "@modules/user/domain/entities/experience";
import type { User } from "@modules/user/domain/entities/user";
import { ExperienceType } from "@modules/user/domain/enums/experience";
import { useUserContext } from "@modules/user/context/useUserContext";
import { createExperience } from "@modules/user/services/experience/create-experience";

interface Props {
  user?: User | null;
}

export default function useExperience({ user }: Props) {
  const { refreshUser } = useUserContext();
  const experiences = user?.experiences || [];
  const skills = user?.skills || [];

  const getExperienceIcon = (type: Experience["type"]) => {
    switch (type) {
      case ExperienceType.EDUCATION:
        return <FaGraduationCap className="w-5 h-5 text-primary" />;
      case ExperienceType.WORK:
        return <FaBriefcase className="w-5 h-5 text-primary" />;
      default:
        return <FaBriefcase className="w-5 h-5 text-primary" />;
    }
  };

  const formatYearRange = (exp: Experience) => {
    const start = exp.startYear;
    const end = exp.isCurrent ? "Actualidad" : exp.endYear;
    return `${start} – ${end}`;
  };

  const addExperience = (expData: Omit<Experience, "id">) =>
    createExperience(expData)
      .then(() => refreshUser())
      .catch(() => toast.error("No se pudo añadir la experiencia"));

  return { experiences, addExperience, skills, getExperienceIcon, formatYearRange };
}
