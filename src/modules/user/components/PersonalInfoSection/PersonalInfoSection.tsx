import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import Input from "@modules/app/modules/ui/components/Input/Input";
import type { ProfileForm } from "@modules/user/domain/form/profile-form";

interface Props {
  formData: ProfileForm;
  handleChange: (field: keyof ProfileForm, value: string) => void;
  touched: {
    email: boolean;
    firstName: boolean;
    userName: boolean;
    lastName: boolean;
  };
  handleTouched: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ProfileForm>>;
}

export default function PersonalInfoSection({
  formData,
  handleChange,
  touched,
  handleTouched,
  setFormData,
}: Props) {
  return (
    <section className="grid gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <FormInput label="Nombre" size="lg">
        <Input
          placeholder="Nombre"
          inputValue={{ value: formData.firstName ?? "", onChange: (value: string) => handleChange("firstName", value) }}
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
        />
      </FormInput>
      <FormInput label="Apellido" size="lg">
        <Input
          placeholder="Apellido"
          inputValue={{ value: formData.lastName ?? "", onChange: (value: string) => handleChange("lastName", value) }}
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
        />
      </FormInput>
      <FormInput label="Nombre de usuario" size="lg">
        <Input
          placeholder="Nombre de usuario"
          inputValue={{ value: formData.userName ?? "", onChange: (value: string) => handleChange("userName", value) }}
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
        />
      </FormInput>
      <FormInput label="Correo electrónico" size="lg">
        <Input
          placeholder="Correo Electrónico"
          inputValue={{ value: formData.email ?? "", onChange: (value: string) => handleChange("email", value) }}
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
        />
      </FormInput>
      <FormInput label="Teléfono" size="lg">
        <Input
          placeholder="Teléfono"
          inputValue={{ value: formData.phoneNumber ?? "", onChange: (value: string) => handleChange("phoneNumber", value) }}
        />
      </FormInput>
      <FormInput label="Años de experiencia" size="lg">
        <Input
          placeholder="Años de Experiencia"
          inputValue={{ value: (formData.experienceYears ?? 0).toString(), onChange: (value: string) => handleChange("experienceYears", value) }}
        />
      </FormInput>
      <FormInput label="Sitio web" size="lg">
        <Input
          placeholder="Website"
          inputValue={{ value: formData.website ?? "", onChange: (value: string) => handleChange("website", value) }}
        />
      </FormInput>
      <FormInput label="Ubicación" size="lg">
        <Input
          placeholder="Ubicación"
          inputValue={{ value: formData.location ?? "", onChange: (value: string) => handleChange("location", value) }}
        />
      </FormInput>
      <FormInput label="Especialización" size="lg">
        <Input
          placeholder="Especialización"
          inputValue={{ value: formData.specialization ?? "", onChange: (value: string) => handleChange("specialization", value) }}
        />
      </FormInput>
    </section>
  );
}
