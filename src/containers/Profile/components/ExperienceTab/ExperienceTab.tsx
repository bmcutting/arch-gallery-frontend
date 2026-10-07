import { FaPlus, FaWrench } from "react-icons/fa";
import type { User } from "@modules/user/domain/entities/user";
import useExperience from "@modules/user/hooks/useExperience";
import Button from "@modules/app/modules/ui/components/Button/Button";
import { ExperienceFormModalProps } from "@modules/user/domain/modal/user-modal";
import useModal from "@modules/app/modules/modal/hooks/useModal";

interface Props {
  user?: User | null;
  readOnly?: boolean;
}

export default function ExperienceTab({ user, readOnly = false }: Props) {
  const { experiences, addExperience, skills, getExperienceIcon, formatYearRange } =
    useExperience({ user });
  const { handleOpenModal } = useModal();

  const openAdd = () =>
    handleOpenModal(new ExperienceFormModalProps(null, addExperience));

  return (
    <div className="space-y-12 md:space-y-16">
      <section>
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-semibold text-black mb-6 md:mb-8">
          Experiencia profesional y formación
        </h2>
        {experiences.length === 0 ? (
          <p className="text-black italic">
            {readOnly
              ? "Aún no ha añadido experiencia profesional o formación."
              : "Aún no has añadido experiencia profesional o formación."}
          </p>
        ) : (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex gap-4 p-4 bg-card rounded-lg shadow-sm border border-border"
              >
                <div className="flex mt-1">{getExperienceIcon(exp.type)}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-black">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-black">
                      {formatYearRange(exp)}
                    </span>
                  </div>
                  <p className="text-base text-black mt-1">
                    {exp.institutionOrCompany}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-black/80 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {!readOnly && (
          <Button size="sm" className="mt-4" onClick={openAdd}>
            <FaPlus className="mr-1" /> Añadir experiencia
          </Button>
        )}
      </section>

      <section>
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-semibold text-black mb-6 md:mb-8">
          Habilidades
        </h2>

        {skills.length === 0 ? (
          <p className="text-black italic">
            No se han agregado habilidades aún.
          </p>

        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm"
              >
                <FaWrench className="w-4 h-4" />
                <span className="text-sm font-medium text-black">
                  {skill.name}
                </span>
                {skill.level && (
                  <span className="text-xs text-black ml-1">
                    ({skill.level})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
