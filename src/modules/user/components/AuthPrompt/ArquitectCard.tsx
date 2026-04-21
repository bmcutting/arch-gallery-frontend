import { FaMapPin, FaUserCircle } from "react-icons/fa";
import type { User } from "../../domain/entities/user";
import Button from "../../../app/modules/ui/components/Button/Button";

interface Props {
  architect?: User;
}

export default function ArchitectCard({ architect }: Props) {
  const hasProfileImage = !!architect?.profileImageUrl;
  const hasSpecialization = !!architect?.specialization;
  const hasBio = !!architect?.shortBio;
  const hasLocation = !!architect?.location;

  const coverPlaceholder = "https://picsum.photos/id/104/400/200";

  const displayName = architect?.userName?.trim() || "Arquitecto";

  const bioText = hasBio ? architect!.shortBio : "Sin descripción";

  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth cursor-pointer group flex flex-col h-full">
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={coverPlaceholder}
          alt="Portada"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="px-5 pb-5 flex-1 flex flex-col">
        <div className="relative -mt-8 mb-3 flex items-end justify-between">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted ring-3 ring-card shadow-warm flex items-center justify-center">
            {hasProfileImage ? (
              <img
                src={architect!.profileImageUrl}
                alt={architect?.firstName || displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle size={40} className="text-muted-foreground/60" />
            )}
          </div>
        </div>

        <h3 className="font-heading font-semibold text-foreground line-clamp-1 mb-0.5">
          {displayName}
        </h3>

        {hasSpecialization && (
          <p className="text-xs mb-2 font-medium">
            {architect!.specialization}
          </p>
        )}

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-10">
          {bioText}
        </p>

        {hasLocation && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <FaMapPin size={12} className="text-muted-foreground" />
            <span>{architect!.location}</span>
          </div>
        )}

        <Button size="lg">Ver perfil</Button>
      </div>
    </article>
  );
}