import { APP_ROUTES } from "../../../modules/app/domain/constants/app-routes";
import Button from "../../../modules/app/modules/ui/components/Button/Button";
import FormInput from "../../../modules/app/modules/ui/components/Form/FormInput";
import Input from "../../../modules/app/modules/ui/components/Input/Input";
import AuthPrompt from "../../../modules/user/components/AuthPrompt/AuthPrompt";
import AuthContainer from "../components/AuthContainer";
import Header from "../components/Header";
import useSignUp from "./hooks/useSignUp";

export default function SignUp() {
  const {
    handleSubmit,
    loading,
    email,
    password,
    firstName,
    userName,
    lastName,
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setUserName,
  } = useSignUp();

  return (
    <AuthContainer>
      <Header />
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormInput label="Correo" size="base" required>
          <Input
            loading={false}
            onChange={setEmail}
            placeholder="user@gmail.com"
            value={email}
            className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
          />
        </FormInput>
        <FormInput label="Nombre" size="base" required>
          <Input
            loading={false}
            onChange={setFirstName}
            placeholder="Carlos"
            value={firstName}
            className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
          />
        </FormInput>
        <FormInput label="Apellido" size="base" required>
          <Input
            loading={false}
            onChange={setLastName}
            placeholder="Peguer"
            value={lastName}
            className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
          />
        </FormInput>
        <FormInput label="Nombre de usuario" size="base" required>
          <Input
            loading={false}
            onChange={setUserName}
            placeholder="carlospeguer"
            value={userName}
            className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
          />
        </FormInput>
        <FormInput label="Contraseña" size="base" required>
          <Input
            loading={false}
            onChange={setPassword}
            value={password}
            type="password"
            placeholder="********"
            className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
          />
        </FormInput>
        <Button
          className="mt-8"
          color="primary"
          size="lg"
          uppercase
          type="submit"
          loading={loading}
          full
        >
          Registrarse
        </Button>
        <AuthPrompt
          message="¿Ya tienes cuenta?"
          linkText="Inicia Sesión"
          to={APP_ROUTES.LOGIN}
        />
      </form>
    </AuthContainer>
  );
}
