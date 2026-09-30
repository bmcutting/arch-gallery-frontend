import { APP_ROUTES } from "../../../modules/app/domain/constants/app-routes";
import Button from "../../../modules/app/modules/ui/components/Button/Button";
import ErrorMessage from "../../../modules/app/modules/ui/components/ErrorMessage/ErrorMessage";
import FormInput from "../../../modules/app/modules/ui/components/Form/FormInput";
import Input from "../../../modules/app/modules/ui/components/Input/Input";
import AuthPrompt from "../../../modules/user/components/AuthPrompt/AuthPrompt";
import AuthContainer from "../components/AuthContainer";
import Header from "../components/Header";
import useSignUp from "./hooks/useSignUp";

export default function SignUp() {
  const {
    step,
    handleStepOneSubmit,
    handleFinalSubmit,
    handleTouched,
    loading,
    email,
    password,
    confirmPassword,
    firstName,
    userName,
    lastName,
    touched,
    error,
    setStep
  } = useSignUp();

  return (
    <AuthContainer>
      <Header />
      {step === 1 && (
        <form className="w-full" onSubmit={handleStepOneSubmit}>
          <FormInput label="Correo" size="base" required>
            <Input
              loading={false}
              inputValue={email}
              placeholder="user@gmail.com"
              name="email"
              onClear={() => email.onChange("")}
              touched={touched.email}
              onBlur={handleTouched}
              errorMsg="Debe añadir un correo electrónico"
            />
          </FormInput>
          <div className="flex gap-5">
            <FormInput label="Nombre" size="base" required>
              <Input
                loading={false}
                inputValue={firstName}
                placeholder="Carlos"
                name="firstName"
                onClear={() => firstName.onChange("")}
                touched={touched.firstName}
                onBlur={handleTouched}
                errorMsg="Debe añadir el nombre"
              />
            </FormInput>
            <FormInput label="Apellido" size="base" required>
              <Input
                loading={false}
                inputValue={lastName}
                placeholder="Peguer"
                name="lastName"
                onClear={() => lastName.onChange("")}
                touched={touched.lastName}
                onBlur={handleTouched}
                errorMsg="Debe añadir el apellido"
              />
            </FormInput>
          </div>
          <FormInput label="Nombre de usuario" size="base" required>
            <Input
              loading={false}
              inputValue={userName}
              placeholder="carlospeguer"
              name="userName"
              onClear={() => userName.onChange("")}
              touched={touched.userName}
              onBlur={handleTouched}
              errorMsg="Debe añadir el nombre de usuario"
            />
          </FormInput>

          <ErrorMessage message={error} />

          <Button
            className="mt-8"
            color="primary"
            size="lg"
            uppercase
            type="submit"
            full
          >
            Continuar
          </Button>
        </form>
      )}

      {step === 2 && (
        <form className="w-full" onSubmit={handleFinalSubmit}>
          <FormInput label="Contraseña" size="base" required>
            <Input
              loading={false}
              inputValue={password}
              name="password"
              type="password"
              placeholder="********"
              onClear={() => password.onChange("")}
              touched={touched.password}
              onBlur={handleTouched}
              errorMsg="Debe añadir la contraseña"
            />
          </FormInput>
          <FormInput label="Confirmar contraseña" size="base" required>
            <Input
              name="confirmPassword"
              inputValue={confirmPassword}
              type="password"
              placeholder="********"
              onClear={() => confirmPassword.onChange("")}
              touched={touched.confirmPassword}
              onBlur={handleTouched}
              errorMsg="Debe confirmar la contraseña"
            />
          </FormInput>

          <ErrorMessage message={error} />

          <div className="mt-8 flex gap-4 justify-center">
            <Button
              color="primary"
              size="lg"
              type="button"
              onClick={() => setStep(1)}
            >
              Volver
            </Button>

            <Button
              color="primary"
              size="lg"
              uppercase
              type="submit"
              loading={loading}
              full
            >
              Registrarse
            </Button>
          </div>
        </form>
      )}

      <AuthPrompt
        message="¿Ya tienes cuenta?"
        linkText="Inicia Sesión"
        to={APP_ROUTES.LOGIN}
      />
    </AuthContainer>
  );
}
