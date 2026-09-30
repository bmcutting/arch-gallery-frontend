import { APP_ROUTES } from "../../../modules/app/domain/constants/app-routes";
import Button from "../../../modules/app/modules/ui/components/Button/Button";
import ErrorMessage from "../../../modules/app/modules/ui/components/ErrorMessage/ErrorMessage";
import FormInput from "../../../modules/app/modules/ui/components/Form/FormInput";
import Input from "../../../modules/app/modules/ui/components/Input/Input";
import AuthPrompt from "../../../modules/user/components/AuthPrompt/AuthPrompt";
import AuthContainer from "../components/AuthContainer";
import Header from "../components/Header";
import useLogin from "./hooks/useLogin";

export default function Login() {
  const {
    handleSubmit,
    handleTouched,
    loading,
    email,
    password,
    touched,
    error,
  } = useLogin();

  return (
    <AuthContainer>
      <Header />
      <form className="w-full" onSubmit={handleSubmit}>
        <FormInput label="Correo" size="base" required>
          <Input
            loading={false}
            inputValue={email}
            placeholder="user@gmail.com"
            name="email"
            touched={touched.email}
            onBlur={handleTouched}
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
            touched={touched.password}
            onBlur={handleTouched}
            errorMsg="Debe añadir la contraseña"
          />
        </FormInput>

        <ErrorMessage message={error} />

        <Button
          className="mt-4"
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
      </form>
    </AuthContainer>
  );
}
