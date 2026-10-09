import type { CreateExperienceDto } from "./create-experience";
import type { UserSkillItemDto } from "./user-skill-item";

export interface UpdateUserDto {
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  shortBio?: string;
  longBio?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  website?: string;
  location?: string;
  experienceYears?: number;
  specialization?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  languages?: string[];
  // Conjuntos completos: lo que no se mande se elimina.
  skills?: UserSkillItemDto[];
  experiences?: (CreateExperienceDto & { id?: string })[];
}
