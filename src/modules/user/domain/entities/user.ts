import type { Experience } from "./experience";
import type { Skill } from "./skill";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  longBio?: string;
  shortBio?: string;
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
  skills?: Skill[];
  experiences?: Experience[];
}
