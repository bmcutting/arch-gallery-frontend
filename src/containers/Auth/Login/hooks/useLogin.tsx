import { useState } from "react";
import { AuthValidator } from "@modules/user/domain/validator/auth/auth-validator";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "@modules/app/entities/local-storage";
import { loginUser } from "@modules/user/services/user/login-user";
import type { HttpResponseError } from "@modules/app/modules/http/domain/error";
import { HttpStatusCode } from "axios";
import { useUserContext } from "@modules/user/context/useUserContext";
import type { FormSubmit } from "@modules/app/modules/ui/components/Form/domain/form-submit";

export default function useLogin() {
  const { refreshUser } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit({ setErrors }: FormSubmit) {
    const validator = new AuthValidator({ email: email, password: password });

    validator.execute({
      success() {
        setLoading(true);

        loginUser({ email: email, password: password })
          .then((data) => {
            LocalStorage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.access_token);
            LocalStorage.set(
              LOCAL_STORAGE_KEY.REFRESH_TOKEN,
              data.refresh_token,
            );

            return refreshUser();
          })
          .then((me) => {
            if (!me) setError("No se pudo cargar tu perfil");
          })
          .catch((e: HttpResponseError) => {
            if (e.status === HttpStatusCode.NotFound) {
              setError("No existe este usuario");
            } else {
              setError(`Hubo un error al autenticar el usuario`);
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
    handleSubmit,
    loading,
    email: { value: email, onChange: setEmail },
    password: {value: password, onChange: setPassword},
    error,
  };
}
