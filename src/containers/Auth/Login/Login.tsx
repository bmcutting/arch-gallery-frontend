import Button from "../../../modules/app/modules/ui/components/Button/Button";
import FormInput from "../../../modules/app/modules/ui/components/Form/FormInput";
import Input from "../../../modules/app/modules/ui/components/Input/Input";
import AuthPrompt from "../../../modules/user/components/AuthPrompt/AuthPrompt";
import AuthContainer from "../components/AuthContainer";
import Header from "../components/Header";
import useLogin from "./hooks/useLogin";

export default function Login() {
  const { handleSubmit, loading, email, password, setEmail, setPassword } =
    useLogin();

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
          Iniciar Sesión
        </Button>

        <AuthPrompt
          message="¿No tienes cuenta?"
          linkText="Regístrate"
          to="/signup"
        />
      </form>
    </AuthContainer>
  );
}
