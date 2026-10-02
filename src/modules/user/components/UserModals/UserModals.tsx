import useModal from "@modules/app/modules/modal/hooks/useModal";
import {
  ExperienceFormModalProps,
  SkillFormModalProps,
} from "@modules/user/domain/modal/user-modal";
import SkillForm from "@modules/user/components/UserModals/components/SkillForm/SkillForm";
import ExperienceForm from "@modules/user/components/UserModals/components/ExperienceForm/ExperienceForm";

export default function UserModals() {
  const { open } = useModal();

  return (
    <>
      {open instanceof SkillFormModalProps && (
        <SkillForm skill={open.skill} onSave={open.onSave} />
      )}
      {open instanceof ExperienceFormModalProps && (
        <ExperienceForm experience={open.experience} onSave={open.onSave} />
      )}
    </>
  );
}
