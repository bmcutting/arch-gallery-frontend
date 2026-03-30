import { FaWrench } from "react-icons/fa";
import type { User } from "../../../../modules/user/domain/entities/user";
import useExperience from "../../hooks/useExperience";

interface Props {
  user?: User | null;
}

export default function ExperienceTab({ user }: Props) {
  const { experiences, skills, getExperienceIcon, formatYearRange } =
    useExperience({ user });

  return (
    <div className="space-y-12 md:space-y-16">
      <section>
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-semibold text-black mb-6 md:mb-8">
          Experiencia profesional y formación
        </h2>
        {experiences.length === 0 ? (
          <p className="text-black italic">
            Aún no has añadido experiencia profesional o formación.
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
      </section>

      <section>
        <h2></h2>
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
