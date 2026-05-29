import {
  FaBriefcase,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTwitter,
  FaPhone,
} from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import type { User } from "../../../../modules/user/domain/entities/user";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../modules/app/domain/constants/app-routes";

interface Props {
  user: User;
  isOwnProfile?: boolean;
}

export default function ProfileHeader({ user, isOwnProfile = true }: Props) {
  const navigate = useNavigate();
  return (
    <div className="mt-14 bg-card border-b border-border">
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto lg:mx-0">
            <img
              src={user?.profileImageUrl ? user.profileImageUrl : "user.png"}
              alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
              className="w-full h-full rounded-full object-cover border-4 border-primary/90"
            />
          </div>

          <div className="flex-1 min-w-0 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-title-bold text-black mb-2">
              {user?.firstName} {user?.lastName}
            </h1>
            {user.specialization && (
              <p className="text-base md:text-lg lg:text-xl text-black font-medium mb-2">
                Especialización: {user.specialization}
              </p>
            )}
            {user.shortBio && (
              <p className="text-sm md:text-base lg:text-lg text-black italic mb-2">
                {user.shortBio}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-6">
              {user?.location && (
                <div className="flex items-center gap-1.5 text-sm md:text-base text-black">
                  <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{user.location}</span>
                </div>
              )}
              {user?.phoneNumber && (
                <div className="flex items-center gap-1.5 text-sm md:text-base text-black">
                  <FaPhone className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{user.phoneNumber}</span>{" "}
                </div>
              )}
              {user?.experienceYears !== undefined &&
                user.experienceYears > 0 && (
                  <div className="flex items-center gap-1.5 text-sm md:text-base text-black">
                    <FaBriefcase className="w-4 h-4 md:w-5 md:h-5" />{" "}
                    <span>
                      {user.experienceYears === 1
                        ? "1 año de experiencia"
                        : `${user.experienceYears} años de experiencia`}
                    </span>
                  </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 ">
              {user?.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm md:text-base text-black hover:text-primary transition-colors"
                  aria-label="Sitio web personal"
                >
                  <IoGlobeOutline className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Sitio web</span>
                </a>
              )}
              {user?.instagramUrl && (
                <a
                  href={user.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {user?.twitterUrl && (
                <a
                  href={user.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {user?.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
            </div>

            {user?.languages && user.languages.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {user.languages.map((lang) => (
                  <span
                    key={lang}
                    className=" px-2 py-1 text-xs md:text-sm font-medium bg-muted text-foreground rounded-full "
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row lg:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `mailto:${user?.email ?? ""}`;
                }}
                className="px-5 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow hover:bg-primary/90 transition-colors"
              >
                Enviar Correo
              </button>
              {isOwnProfile && (
                <button
                  type="button"
                  onClick={() => navigate(APP_ROUTES.PROFILEMANAGEMENT)}
                  className="px-5 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow hover:bg-primary/90 transition-colors"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
