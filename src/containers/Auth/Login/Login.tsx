import { APP_ROUTES } from "../../../modules/app/domain/constants/app-routes";
import Button from "../../../modules/app/modules/ui/components/Button/Button";
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
    setEmail,
    setPassword,
  } = useLogin();
  
  return (
    <AuthContainer>
      <Header />
      <form className="w-full" onSubmit={handleSubmit}>
        <FormInput label="Correo" size="base" required>
          <Input
            loading={false}
            onChange={setEmail}
            placeholder="user@gmail.com"
            name="email"
            onClear={() => setEmail("")}
            touched={touched.email}
            onBlur={handleTouched}
            errorMsg="Debe añadir un correo electrónico"
            value={email}
            className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
          />
        </FormInput>

        <FormInput label="Contraseña" size="base" required>
          <Input
            loading={false}
            onChange={setPassword}
            name="password"
            value={password}
            type="password"
            placeholder="********"
            onClear={() => setPassword("")}
            touched={touched.password}
            onBlur={handleTouched}
            errorMsg="Debe añadir la contraseña"
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
          Iniciar Sesión
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
