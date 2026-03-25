import { FaMapPin, FaUserCircle } from "react-icons/fa";
import type { User } from "../../domain/entities/user";
import Button from "../../../app/modules/ui/components/Button/Button";

interface Props {
  architect?: User;
}

export default function ArchitectCard({ architect }: Props) {
  const hasProfileImage = !!architect?.profileImageUrl;
  const hasSpecialization = !!architect?.specialization;
  const hasBio = !!architect?.bio;
  const hasLocation = !!architect?.location;

  // Placeholder de portada (puedes cambiarlo por tu imagen real)
  const coverPlaceholder = "https://picsum.photos/id/104/400/200";

  // Fallback de nombre
  const displayName = architect?.userName?.trim() || "Arquitecto";

  // Bio por defecto si no la tiene
  const bioText = hasBio ? architect!.bio : "Sin biografía aún";

  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth cursor-pointer group flex flex-col h-full">
      {/* Cover image */}
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={coverPlaceholder}
          alt="Portada"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenido principal */}
      <div className="px-5 pb-5 flex-1 flex flex-col">
        {/* Foto de perfil superpuesta */}
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

        {/* Nombre */}
        <h3 className="font-heading font-semibold text-black line-clamp-1 mb-0.5">
          {displayName}
        </h3>

        {/* Especialidad (solo si existe) */}
        {hasSpecialization && (
          <p className="text-xs text-accent mb-2 font-medium">
            {architect!.specialization}
          </p>
        )}

        {/* Bio (siempre visible, con texto por defecto si no hay) */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
          {bioText}
        </p>

        {/* Ubicación (solo si existe) */}
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