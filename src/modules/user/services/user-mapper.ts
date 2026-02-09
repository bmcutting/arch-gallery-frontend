import type { User } from "../domain/entities/user";
import type { UserResponse } from "../dto/read/user";

export class UserMapper {
  static execute(r: UserResponse): User {
    console.log(r);
    return {
      id: r.id,
      email: r.email,
      lastName: r.lastName,
      firstName: r.firstName,
      userName: r.userName,
      bio: r.bio,
      location: r.location,
      website: r.website,
      experienceYears: r.experienceYears,
      specialization: r.specialization,
      profileImageUrl: r.profileImageUrl,
      phoneNumber: r.phoneNumber,
      instagramUrl: r.instagramUrl,
      twitterUrl: r.twitterUrl,
      linkedinUrl: r.linkedinUrl,
      languages: r.languages,
    };
  }
}
