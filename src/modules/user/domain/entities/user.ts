export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  bio?: string;
  profileImageUrl?: string;
  website?: string;
  location?: string;
  experienceYears?: number;
  specialization?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  languages?: string[];
}
