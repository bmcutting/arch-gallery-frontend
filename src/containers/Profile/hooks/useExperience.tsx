import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import type { Experience } from "../../../modules/user/domain/entities/experience";
import type { User } from "../../../modules/user/domain/entities/user";
import { ExperienceType } from "../../../modules/user/domain/enums/experience";

interface Props {
  user?: User | null;
}

export default function useExperience({ user }: Props) {
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

  return { experiences, skills, getExperienceIcon, formatYearRange };
}
