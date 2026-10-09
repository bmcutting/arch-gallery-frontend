import { useState } from "react";
import { createUser } from "@modules/user/services/user/create-user";
import { SignUpValidator } from "@modules/user/domain/validator/signup/signup-validator";
import { SignUpPasswordValidator } from "@modules/user/domain/validator/signup/signup-password-validator";
import type { FormSubmit } from "@modules/app/modules/ui/components/Form/domain/form-submit";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "@modules/app/entities/local-storage";
import type { HttpResponseError } from "@modules/app/modules/http/domain/error";
import { HttpStatusCode } from "axios";
import { loginUser } from "@modules/user/services/user/login-user";
import { useUserContext } from "@modules/user/context/useUserContext";

export default function useSignUp() {
  const { refreshUser } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleStepOneSubmit({ setErrors }: FormSubmit) {
    new SignUpValidator({ email, firstName, lastName, userName }).execute({
      success: () => setStep(2),
      error: setErrors,
    });
  }

  function handleFinalSubmit({ setErrors }: FormSubmit) {
    const validator = new SignUpPasswordValidator({ password, confirmPassword });

    validator.execute({
      success() {
        setLoading(true);

        createUser({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
        })
          .then(() => {
            return loginUser({ email, password });
          })
          .then((loginData) => {
            LocalStorage.set(
              LOCAL_STORAGE_KEY.ACCESS_TOKEN,
              loginData.access_token,
            );
            LocalStorage.set(
              LOCAL_STORAGE_KEY.REFRESH_TOKEN,
              loginData.refresh_token,
            );

            return refreshUser();
          })
          .then((me) => {
            if (!me) setError("No se pudo cargar tu perfil");
          })
          .catch((e: HttpResponseError) => {
            if (e.status === HttpStatusCode.Conflict) {
              setError(
                "Ya existe este usuario",
              );
            } else {
              setError("Hubo un error al crear el usuario");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
      error: setErrors,
    });
  }

  return {
    step,
    handleStepOneSubmit,
    handleFinalSubmit,
    loading,
    email: { value: email, onChange: setEmail },
    password: { value: password, onChange: setPassword },
    confirmPassword: { value: confirmPassword, onChange: setConfirmPassword },
    firstName: { value: firstName, onChange: setFirstName },
    userName: { value: userName, onChange: setUserName },
    lastName: { value: lastName, onChange: setLastName },
    error,
    setStep,
  };
}
