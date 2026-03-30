import type { User } from "../domain/entities/user";
import type { UserResponse } from "../dto/read/user";
import { ExperienceMapper } from "./experience-mapper";
import { SkillMapper } from "./skill-mapper";

export class UserMapper {
  static execute(r: UserResponse): User {
    return {
      id: r.id,
      email: r.email,
      lastName: r.lastName,
      firstName: r.firstName,
      userName: r.userName,
      shortBio: r.shortBio,
      longBio: r.longBio,
      location: r.location,
      website: r.website,
      experienceYears: r.experienceYears,
      specialization: r.specialization,
      profileImageUrl: r.profileImageUrl,
      coverImageUrl: r.coverImageUrl,
      phoneNumber: r.phoneNumber,
      instagramUrl: r.instagramUrl,
      twitterUrl: r.twitterUrl,
      linkedinUrl: r.linkedinUrl,
      languages: r.languages,
      skills: SkillMapper.toDomainList(r.skills),
      experiences: ExperienceMapper.toDomainList(r.experiences),
    };
  }
}
