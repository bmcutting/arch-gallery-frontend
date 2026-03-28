import Input from "../../modules/app/modules/ui/components/Input/Input";
import AppLayout from "../Home/components/AppLayout";
import ProfilePhotoUpload from "./components/ProfilePhotoUploadForm";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import useUpdateUser from "./hooks/useUpdateUser";
import FormInput from "../../modules/app/modules/ui/components/Form/FormInput";
import Button from "../../modules/app/modules/ui/components/Button/Button";
import Textarea from "../../modules/app/modules/ui/components/TextArea/TextArea";

export default function ProfileManagement() {
  const {
    formData,
    status,
    touched,
    handleTouched,
    handleSave,
    handleChange,
    addLanguage,
    removeLanguage,
    updateLanguage,
    setFormData,
  } = useUpdateUser();

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
            </div>
          </div>
          <form onSubmit={handleSave}>
            <div className="rounded-lg shadow-warm-lg overflow-hidden">
              <div className="p-6 md:p-8 border-b border-border">
                <ProfilePhotoUpload />
              </div>

              <div className="px-6 py-3 md:px-8 md:py-4">
                <h2 className="text-lg md:text-xl font-semibold mb-6">
                  Información Personal
                </h2>

                <div className="grid gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <FormInput label="Nombre" size="lg">
                    <Input
                      placeholder="Nombre"
                      value={formData.firstName ?? ""}
                      onChange={(value: string) =>
                        handleChange("firstName", value)
                      }
                      name="firstName"
                      touched={touched.firstName}
                      onBlur={handleTouched}
                      errorMsg="Debe añadir el nombre"
                      onClear={() =>
                        setFormData((prev) => ({
                          ...prev,
                          firstName: "",
                        }))
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Apellido" size="lg">
                    <Input
                      placeholder="Apellido"
                      value={formData.lastName ?? ""}
                      onChange={(value: string) =>
                        handleChange("lastName", value)
                      }
                      name="lastName"
                      touched={touched.lastName}
                      onBlur={handleTouched}
                      errorMsg="Debe añadir el apellido"
                      onClear={() =>
                        setFormData((prev) => ({
                          ...prev,
                          lastName: "",
                        }))
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Nombre de usuario" size="lg">
                    <Input
                      placeholder="Nombre de usuario"
                      value={formData.userName ?? ""}
                      onChange={(value: string) =>
                        handleChange("userName", value)
                      }
                      name="userName"
                      touched={touched.userName}
                      onBlur={handleTouched}
                      errorMsg="Debe añadir el nombre de usuario"
                      onClear={() =>
                        setFormData((prev) => ({
                          ...prev,
                          userName: "",
                        }))
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Correo electrónico" size="lg">
                    <Input
                      placeholder="Correo Electrónico"
                      value={formData.email ?? ""}
                      onChange={(value: string) => handleChange("email", value)}
                      name="email"
                      touched={touched.email}
                      onBlur={handleTouched}
                      errorMsg="Debe añadir el correo electrónico"
                      onClear={() =>
                        setFormData((prev) => ({
                          ...prev,
                          email: "",
                        }))
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Teléfono" size="lg">
                    <Input
                      placeholder="Teléfono"
                      value={formData.phoneNumber ?? ""}
                      onChange={(value: string) =>
                        handleChange("phoneNumber", value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Años de experiencia" size="lg">
                    <Input
                      placeholder="Años de Experiencia"
                      value={(formData.experienceYears ?? 0).toString()}
                      onChange={(value: string) =>
                        handleChange("experienceYears", value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Sitio web" size="lg">
                    <Input
                      placeholder="Website"
                      value={formData.website ?? ""}
                      onChange={(value: string) =>
                        handleChange("website", value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Ubicación" size="lg">
                    <Input
                      placeholder="Ubicación"
                      value={formData.location ?? ""}
                      onChange={(value: string) =>
                        handleChange("location", value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                  <FormInput label="Especialización" size="lg">
                    <Input
                      placeholder="Especialización"
                      value={formData.specialization ?? ""}
                      onChange={(value: string) =>
                        handleChange("specialization", value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
                    />
                  </FormInput>
                </div>
              </div>

              <div className="px-6 py-3 md:px-8 md:py-4">
                <FormInput label="Biografía profesional" size="lg">
                  <Textarea
                    placeholder="Escribe tu biografía profesional..."
                    value={formData.longBio}
                    onChange={(value: string) => handleChange("longBio", value)}
                    maxChars={500}
                    className="h-40 md:h-56 lg:h-64 px-3 py-2 text-sm md:text-base lg:text-lg 
               rounded-md border border-gray-300 focus:ring-2 focus:ring-primary 
               resize-none leading-relaxed"
                  />
                </FormInput>
              </div>

              <div className="px-6 py-3 md:px-8 md:py-4">
                <h2 className="text-lg md:text-xl font-semibold mb-6">
                  Redes Sociales
                </h2>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex gap-2 items-center text-xl md:text-2xl lg:text-3xl">
                    <FaInstagram className="text-pink-500" />
                    <input
                      placeholder="Instagram"
                      value={formData.instagramUrl ?? ""}
                      onChange={(e) =>
                        handleChange("instagramUrl", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md 
                 border border-gray-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex gap-2 items-center text-xl md:text-2xl lg:text-3xl">
                    <FaTwitter className="text-sky-500" />
                    <input
                      placeholder="Twitter"
                      value={formData.twitterUrl ?? ""}
                      onChange={(e) =>
                        handleChange("twitterUrl", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md 
                 border border-gray-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex gap-2 items-center text-xl md:text-2xl lg:text-3xl">
                    <FaLinkedin className="text-blue-700" />
                    <input
                      placeholder="LinkedIn"
                      value={formData.linkedinUrl ?? ""}
                      onChange={(e) =>
                        handleChange("linkedinUrl", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md 
                 border border-gray-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="px-6 py-3 md:px-8 md:py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Idiomas
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {formData.languages?.map((lang, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Input
                          value={lang}
                          onChange={(value) => updateLanguage(index, value)}
                          placeholder="Ej: Español, Inglés, Francés..."
                          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                          title="Eliminar idioma"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={addLanguage}
                      size="base"
                      full
                      color="primary"
                    >
                      <span className="text-lg">+</span> Añadir idioma
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 px-6 py-3 md:px-8 md:py-4">
                  <Button type="submit" size="lg" full status={status}>
                    <span className="font-medium">
                      {status === "success"
                        ? "Guardado"
                        : status === "error"
                          ? "Error al guardar"
                          : "Guardar"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
