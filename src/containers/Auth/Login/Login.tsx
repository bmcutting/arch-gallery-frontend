import { APP_ROUTES } from "@modules/app/domain/constants/app-routes";
import Button from "@modules/app/modules/ui/components/Button/Button";
import ErrorMessage from "@modules/app/modules/ui/components/ErrorMessage/ErrorMessage";
import Form from "@modules/app/modules/ui/components/Form/Form";
import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import Input from "@modules/app/modules/ui/components/Input/Input";
import AuthPrompt from "@modules/user/components/AuthPrompt/AuthPrompt";
import AuthContainer from "@containers/Auth/components/AuthContainer";
import Header from "@containers/Auth/components/Header";
import useLogin from "./hooks/useLogin";

export default function Login() {
  const {
    handleSubmit,
    loading,
    email,
    password,
    error,
  } = useLogin();

  return (
    <AuthContainer>
      <Header />
      <Form className="w-full" onSubmit={handleSubmit}>
        <FormInput label="Correo" size="base" required>
          <Input
            loading={false}
            inputValue={email}
            placeholder="user@gmail.com"
            name="email"
            errorMsg="Debe añadir un correo electrónico"
          />
        </FormInput>

        <FormInput label="Contraseña" size="base" required>
          <Input
            loading={false}
            inputValue={password}
            name="password"
            type="password"
            placeholder="********"
            errorMsg="Debe añadir la contraseña"
          />
        </FormInput>

        <ErrorMessage message={error} />

        <Button
          className="mt-5"
          color="primary"
          size="lg"
          uppercase
          type="submit"
          loading={loading}
          full
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>

        <AuthPrompt
          message="¿No tienes cuenta?"
          linkText="Regístrate"
          to={APP_ROUTES.SIGNUP}
        />
      </Form>
    </AuthContainer>
  );
}
