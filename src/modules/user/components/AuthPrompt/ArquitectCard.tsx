import { FaMapPin } from "react-icons/fa";
import type { User } from "../../domain/entities/user";
import Button from "../../../app/modules/ui/components/Button/Button";

interface Props {
  architect?: User;
}

export default function ArchitectCard({ architect }: Props) {
  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth cursor-pointer group">
      <div className="px-5 pb-5">
        <div className="relative -mt-8 mb-3 flex items-end justify-between">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted ring-3 ring-card shadow-warm">
            <img
              src={architect?.profileImageUrl}
              alt={architect?.firstName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h3 className="font-heading font-semibold text-black line-clamp-1 mb-0.5">
          {architect?.userName}
        </h3>
        <p className="text-xs text-accent mb-2 font-medium">
          {architect?.specialization}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {architect?.bio}
        </p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <FaMapPin
            name="MapPin"
            size={12}
            color="var(--color-muted-foreground)"
          />
          <span>{architect?.location}</span>
        </div>

        <Button size="lg"> Ver perfil</Button>
      </div>
    </article>
  );
}
