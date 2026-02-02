import { useState } from "react";
import { AuthValidator } from "../../../../modules/user/domain/validator/auth/auth-validator";
import useToast from "../../../../modules/app/hooks/useToast";
import { useNavigate } from "react-router-dom";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "../../../../modules/app/entities/local-storage";
import { loginUser } from "../../../../modules/user/services/login-user";
import type { HttpResponseError } from "../../../../modules/app/modules/http/domain/error";
import { HttpStatusCode } from "axios";

export default function useLogin() {
  const { errors, error } = useToast();
  const router = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    const validator = new AuthValidator({ email: email, password: password });

    validator.execute({
      success() {
        setLoading(true);

        loginUser({ email: email, password: password })
          .then((data) => {
            LocalStorage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.access_token);
            router("/home", { replace: true });
          })
          .catch((e: HttpResponseError) => {
            if (e.status === HttpStatusCode.NotFound) {
              error({
                id: "not-found-error",
                message: "No existe este usuario",
              });
            } else {
              error({ message: `Hubo un error al autenticar el usuario` });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
      error: errors,
    });
  }
  return { handleSubmit, loading, email, password, setPassword, setEmail };
}
