import type { User } from "../../../../modules/user/domain/entities/user";

interface Props {
  user?: User | null;
}

export default function ExperienceTab({ user }: Props) {
  return (
    <div>
      <p>Experiencia</p>
      <p>{user?.experiences?.length}</p>
    </div>
  );
}
