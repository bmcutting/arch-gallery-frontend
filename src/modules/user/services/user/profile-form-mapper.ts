import type { Experience } from "@modules/user/domain/entities/experience";
import type { Skill } from "@modules/user/domain/entities/skill";
import type { User } from "@modules/user/domain/entities/user";
import type {
  ExperienceFormItem,
  ProfileFormValues,
  SkillFormItem,
} from "@modules/user/domain/forms/profile-form";

export class ProfileFormMapper {
  static fromUser(user: User): ProfileFormValues {
    return {
      ...user,
      languages: user.languages ?? [],
      skills: ProfileFormMapper.skills(user.skills),
      experiences: ProfileFormMapper.experiences(user.experiences),
    };
  }

  static skills(skills: Skill[] = []): SkillFormItem[] {
    return skills.map((skill) => ({ ...skill, key: skill.id }));
  }

  static experiences(experiences: Experience[] = []): ExperienceFormItem[] {
    return experiences.map((experience) => ({
      ...experience,
      key: experience.id,
    }));
  }
}
