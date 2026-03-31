import FormInput from "../../../app/modules/ui/components/Form/FormInput";
import Input from "../../../app/modules/ui/components/Input/Input";
import type { User } from "../../domain/entities/user";

interface Props {
  formData: User;
  handleChange: (field: keyof User, value: string) => void;
  touched: {
    email: boolean;
    firstName: boolean;
    userName: boolean;
    lastName: boolean;
  };
  handleTouched: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
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
          value={formData.firstName ?? ""}
          onChange={(value: string) => handleChange("firstName", value)}
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
          onChange={(value: string) => handleChange("lastName", value)}
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
          onChange={(value: string) => handleChange("userName", value)}
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
          onChange={(value: string) => handleChange("phoneNumber", value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
        />
      </FormInput>
      <FormInput label="Años de experiencia" size="lg">
        <Input
          placeholder="Años de Experiencia"
          value={(formData.experienceYears ?? 0).toString()}
          onChange={(value: string) => handleChange("experienceYears", value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
        />
      </FormInput>
      <FormInput label="Sitio web" size="lg">
        <Input
          placeholder="Website"
          value={formData.website ?? ""}
          onChange={(value: string) => handleChange("website", value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
        />
      </FormInput>
      <FormInput label="Ubicación" size="lg">
        <Input
          placeholder="Ubicación"
          value={formData.location ?? ""}
          onChange={(value: string) => handleChange("location", value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
        />
      </FormInput>
      <FormInput label="Especialización" size="lg">
        <Input
          placeholder="Especialización"
          value={formData.specialization ?? ""}
          onChange={(value: string) => handleChange("specialization", value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary border border-primary focus:border-0"
        />
      </FormInput>
    </section>
  );
}
