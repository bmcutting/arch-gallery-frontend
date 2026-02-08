import { useEffect, useState } from "react";
import Input from "../../modules/app/modules/ui/components/Input/Input";
import AppLayout from "../Home/components/AppLayout";
import useProfile from "../Profile/hooks/useProfile";
import ProfilePhotoUpload from "./components/ProfilePhotoUploadForm";
import type { User } from "../../modules/user/domain/entities/user";

export default function ProfileManagement() {
  const user = useProfile();

  const [formData, setFormData] = useState<User>({
    id: user?.id ?? "",
    email: user?.email ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    userName: user?.userName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    bio: user?.bio ?? "",
    profileImageUrl: user?.profileImageUrl ?? "",
    website: user?.website ?? "",
    location: user?.location ?? "",
    experienceYears: user?.experienceYears ?? 0,
    specialization: user?.specialization ?? "",
    instagramUrl: user?.instagramUrl ?? "",
    twitterUrl: user?.twitterUrl ?? "",
    linkedinUrl: user?.linkedinUrl ?? "",
    languages: user?.languages ?? [],
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ ...user, languages: user.languages ?? [] });
    }
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = () => {
    console.log("Datos a guardar:", formData);
  };

  return (
    <AppLayout>
      <div className="mt-14 min-h-screen bg-white py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-black mb-2">
                  Gestión del Perfil
                </h1>
                <p className="text-sm md:text-base text-black">
                  Administra tu información profesional y tus preferencias
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="border hover:bg-purple-100 hover:text-black p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  Vista previa
                </button>
                <button
                  className="border hover:bg-purple-100 hover:text-black p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  onClick={handleSave}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-warm-lg overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border">
              <ProfilePhotoUpload />
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-semibold mb-6">
                Información Personal
              </h2>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Input
                  placeholder="Nombre"
                  value={formData.firstName ?? user?.firstName ?? ""}
                  onChange={(value: string) => handleChange("firstName", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Apellido"
                  value={formData.lastName ?? user?.lastName ?? ""}
                  onChange={(value: string) => handleChange("lastName", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Nombre de usuario"
                  value={formData.userName ?? user?.userName ?? ""}
                  onChange={(value: string) => handleChange("userName", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Correo Electrónico"
                  value={formData.email ?? user?.email ?? ""}
                  onChange={(value: string) => handleChange("email", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Teléfono"
                  value={formData.phoneNumber ?? user?.phoneNumber ?? ""}
                  onChange={(value: string) =>
                    handleChange("phoneNumber", value)
                  }
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Biografía"
                  value={formData.bio ?? user?.bio ?? ""}
                  onChange={(value: string) => handleChange("bio", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Website"
                  value={formData.website ?? user?.website ?? ""}
                  onChange={(value: string) => handleChange("website", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Ubicación"
                  value={formData.location ?? user?.location ?? ""}
                  onChange={(value: string) => handleChange("location", value)}
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Especialización"
                  value={formData.specialization ?? user?.specialization ?? ""}
                  onChange={(value: string) =>
                    handleChange("specialization", value)
                  }
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-semibold mb-6">
                Redes Sociales
              </h2>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Input
                  placeholder="Instagram"
                  value={formData.instagramUrl ?? ""}
                  onChange={(value: string) =>
                    handleChange("instagramUrl", value)
                  }
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="Twitter"
                  value={formData.twitterUrl ?? ""}
                  onChange={(value: string) =>
                    handleChange("twitterUrl", value)
                  }
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />

                <Input
                  placeholder="LinkedIn"
                  value={formData.linkedinUrl ?? ""}
                  onChange={(value: string) =>
                    handleChange("linkedinUrl", value)
                  }
                  className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mt-8">
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  Idiomas
                </h2>
                <div className="space-y-4">
                  {formData.languages?.map((lang, index) => (
                    <Input
                      key={index}
                      value={lang}
                      onChange={(value) => {
                        const newLanguages = [...(formData.languages ?? [])];
                        newLanguages[index] = value;
                        setFormData((prev) => ({
                          ...prev,
                          languages: newLanguages,
                        }));
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
