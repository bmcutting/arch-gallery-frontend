import type { ProfileFormValues } from "@modules/user/domain/forms/profile-form";
import type { UpdateUserDto } from "@modules/user/dto/write/update-user";

export class UserMapperDto {
  static execute(user: ProfileFormValues): UpdateUserDto {
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
      // "Sin nivel" llega del select como "", que no es un nivel valido.
      skills: user.skills.map((skill) =>
        skill.skillId
          ? { id: skill.skillId, level: skill.level || undefined }
          : { name: skill.name, level: skill.level || undefined },
      ),
      // Sin id el backend la crea; con id la actualiza.
      experiences: user.experiences.map((experience) => ({
        id: experience.id,
        type: experience.type,
        title: experience.title,
        institutionOrCompany: experience.institutionOrCompany,
        description: experience.description,
        startYear: experience.startYear,
        endYear: experience.endYear,
        isCurrent: experience.isCurrent,
      })),
    };
  }
}
