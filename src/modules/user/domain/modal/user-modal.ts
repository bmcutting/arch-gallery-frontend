import { ModalProps } from "@modules/app/modules/modal/domain/base";
import type { Skill } from "@modules/user/domain/entities/skill";
import type { Experience } from "@modules/user/domain/entities/experience";

export class SkillFormModalProps extends ModalProps {
  constructor(
    readonly skill: Omit<Skill, "id"> | null,
    readonly onSave: (skillData: Omit<Skill, "id">) => void,
  ) {
    super();
  }
}

export class ExperienceFormModalProps extends ModalProps {
  constructor(
    readonly experience: Omit<Experience, "id"> | null,
    readonly onSave: (expData: Omit<Experience, "id">) => void,
  ) {
    super();
  }
}
