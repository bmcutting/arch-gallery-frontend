import { useState } from "react";
import { AuthValidator } from "../../../../modules/user/domain/validator/auth/auth-validator";
import { useNavigate } from "react-router-dom";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "../../../../modules/app/entities/local-storage";
import { loginUser } from "../../../../modules/user/services/login-user";
import type { HttpResponseError } from "../../../../modules/app/modules/http/domain/error";
import { HttpStatusCode } from "axios";

export default function useLogin() {
  const router = useNavigate();

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTouched = { ...touched };
    if (!email) newTouched.email = true;
    if (!password) newTouched.password = true;
    setTouched(newTouched);

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
              setError("No existe este usuario");
            } else {
              setError(`Hubo un error al autenticar el usuario`);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
      error(errors) {
        if (errors.length > 0) {
          setError(errors[0].message);
        }
      },
    });
  }

  const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  return {
    handleSubmit,
    handleTouched,
    loading,
    email,
    password,
    touched,
    error,
    setPassword,
    setEmail,
  };
}
