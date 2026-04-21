import AppLayout from "../../layouts/AppLayout";
import ProfilePhotoUpload from "./components/ProfilePhotoUpload/ProfilePhotoUpload";
import useUpdateUser from "./hooks/useUpdateUser";
import Button from "../../modules/app/modules/ui/components/Button/Button";
import PersonalInfoSection from "../../modules/user/components/PersonalInfoSection/PersonalInfoSection";
import CollapsibleSection from "../../modules/app/modules/shared/components/CollapsibleSection/CollapsibleSection";
import BioSection from "../../modules/user/components/BioSection/BioSection";
import SocialSection from "../../modules/user/components/SocialSection/SocialSection";
import LanguageSection from "../../modules/user/components/LanguagesSection/LanguagesSection";
import CoverImageUpload from "./components/CoverImageUpload/CoverImageUpload";
import ExperienceSection from "../../modules/user/components/ExperienceSection/ExperienceSection";
import SkillSection from "../../modules/user/components/SkillSection/SkillSection";

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
    addExperience,
    removeExperience,
    updateExperience,
    addSkill,
    removeSkill,
    updateSkill,
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
                <CoverImageUpload />
              </div>

              <div className="px-6 py-3 md:px-8 md:py-4">
                <CollapsibleSection title="Información Personal" defaultOpen>
                  <PersonalInfoSection
                    formData={formData}
                    handleChange={handleChange}
                    touched={touched}
                    handleTouched={handleTouched}
                    setFormData={setFormData}
                  />
                </CollapsibleSection>
              </div>

              <div className="px-6 py-3 md:px-8 md:py-4">
                <CollapsibleSection title="Biografía">
                  <BioSection formData={formData} handleChange={handleChange} />
                </CollapsibleSection>
              </div>

              <div className="px-6 py-3 md:px-8 md:py-4">
                <CollapsibleSection title="Redes Sociales">
                  <SocialSection
                    formData={formData}
                    handleChange={handleChange}
                  />
                </CollapsibleSection>
              </div>
              <div className="px-6 py-3 md:px-8 md:py-4">
                <CollapsibleSection title="Idiomas">
                  <LanguageSection
                    formData={formData}
                    updateLanguage={updateLanguage}
                    removeLanguage={removeLanguage}
                    addLanguage={addLanguage}
                  />
                </CollapsibleSection>
              </div>
              <div className="px-6 py-3 md:px-8 md:py-4">
                <CollapsibleSection title="Experiencia laboral y estudiantil">
                  <ExperienceSection
                    experiences={formData.experiences ?? []}
                    addExperience={addExperience}
                    removeExperience={removeExperience}
                    updateExperience={updateExperience}
                  />
                </CollapsibleSection>
              </div>
              <div className="px-6 py-3 md:px-8 md:py-4">
                <CollapsibleSection title="Habilidades">
                  <SkillSection
                    skills={formData.skills ?? []}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    updateSkill={updateSkill}
                  />
                </CollapsibleSection>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 px-6 py-3 md:px-8 md:py-4">
                <Button type="submit" size="lg" full status={status}>
                  <span className="font-medium">
                    {status === "success"
                      ? "Guardado"
                      : status === "error"
                        ? "Error al guardar"
                        : "Guardar todo"}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
