import type { User } from "../../../../modules/user/domain/entities/user";

interface Props {
  user?: User | null;
}

export default function AbouTab({ user }: Props) {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <section>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4 md:mb-6">
          Biografía personal
        </h2>
        <div className="prose prose-stone max-w-none animate-fadeIn">
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed tracking-wide">
            {user?.longBio || "Aún no hay biografía disponible."}
          </p>
        </div>
      </section>
    </div>
  );
}
