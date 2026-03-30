export interface UpdateUserDto {
  userId: string;
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
}
