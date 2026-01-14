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
            size="base"
            value={email}
          />
        </FormInput>
        <FormInput label="Nombre" size="base" required>
          <Input
            loading={false}
            onChange={setFirstName}
            placeholder="Carlos"
            size="base"
            value={firstName}
          />
        </FormInput>
        <FormInput label="Apellido" size="base" required>
          <Input
            loading={false}
            onChange={setLastName}
            placeholder="Peguer"
            size="base"
            value={lastName}
          />
        </FormInput>
        <FormInput label="Nombre de usuario" size="base" required>
          <Input
            loading={false}
            onChange={setUserName}
            placeholder="carlospeguer"
            size="base"
            value={userName}
          />
        </FormInput>
        <FormInput label="Contraseña" size="base" required>
          <Input
            loading={false}
            onChange={setPassword}
            value={password}
            type="password"
            placeholder="********"
            size="base"
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
          to="/login"
        />
      </form>
    </AuthContainer>
  );
}
