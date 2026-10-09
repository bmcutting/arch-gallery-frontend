import type { ProfileForm } from "@modules/user/domain/form/profile-form";
import type { UpdateUserDto } from "@modules/user/dto/write/update-user";

export class UserMapperDto {
  static execute(user: ProfileForm): UpdateUserDto {
    return {
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      shortBio: user.shortBio,
      longBio: user.longBio,
      profileImageUrl: user.profileImageUrl,
      coverImageUrl: user.coverImageUrl,
      website: user.website,
      location: user.location,
      experienceYears:
        user.experienceYears == null ? undefined : Number(user.experienceYears),
      specialization: user.specialization,
      instagramUrl: user.instagramUrl,
      twitterUrl: user.twitterUrl,
      linkedinUrl: user.linkedinUrl,
      languages: user.languages ?? [],
    };
  }
}
