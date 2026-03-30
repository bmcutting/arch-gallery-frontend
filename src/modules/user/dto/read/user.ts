import type { ExperienceResponse } from "./experience";
import type { SkillResponse } from "./skill";

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  longBio: string;
  shortBio: string;
  location: string;
  website: string;
  experienceYears: number;
  specialization: string;
  profileImageUrl: string;
  coverImageUrl: string;
  phoneNumber: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  languages: string[];
  skills: SkillResponse[];
  experiences: ExperienceResponse[];
}
