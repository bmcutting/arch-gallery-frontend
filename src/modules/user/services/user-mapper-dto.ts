import type { User } from "../domain/entities/user";
import type { UpdateUserDto } from "../dto/write/update-user";

export class UserMapperDto {
  static execute(user: User): UpdateUserDto {
    return {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      profileImageUrl: user.profileImageUrl,
      website: user.website,
      location: user.location,
      experienceYears: user.experienceYears,
      specialization: user.specialization,
      instagramUrl: user.instagramUrl,
      twitterUrl: user.twitterUrl,
      linkedinUrl: user.linkedinUrl,
      languages: user.languages ?? [],
    };
  }
}
