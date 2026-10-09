import type { Experience } from "@modules/user/domain/entities/experience";
import type { Skill } from "@modules/user/domain/entities/skill";
import type { User } from "@modules/user/domain/entities/user";

// Los elementos que se añaden en el formulario no tienen id hasta que se
// guardan; `key` es solo para la UI y nunca se manda al backend.
type FormItem<T extends { id: string }> = Omit<T, "id"> & {
  id?: string;
  key: string;
};

export type ExperienceFormItem = FormItem<Experience>;
export type SkillFormItem = FormItem<Skill>;

export interface ProfileFormValues
  extends Omit<User, "skills" | "experiences"> {
  skills: SkillFormItem[];
  experiences: ExperienceFormItem[];
}
