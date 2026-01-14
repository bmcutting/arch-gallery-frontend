import { useNavigate } from "react-router-dom";
import useToast from "../../../../modules/app/hooks/useToast";
import { useState } from "react";
import { createUser } from "../../../../modules/user/services/create-user";
import { SignUpValidator } from "../../../../modules/user/domain/validator/signup/signup-validator";
import { LOCAL_STORAGE_KEY, LocalStorage } from "../../../../modules/app/entities/local-storage";
import type { HttpResponseError } from "../../../../modules/app/modules/http/domain/error";
import { HttpStatusCode } from "axios";

export default function useSignUp() {
  const { errors, error } = useToast();
  const router = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSubmit() {
    const validator = new SignUpValidator({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    });

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
          .then((data) => {
            LocalStorage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);

            router("/home", { replace: true });
          })
          .catch((e: HttpResponseError) => {
            if (e.status === HttpStatusCode.Conflict) {
              error({
                id: "not-found-error",
                message: "Ya existe un usuario con este correo",
              });
            } else {
              error({ message: `Hubo un error al crear el usuario` });
            }
          })
          .finally(() => {
            setLoading(true);
          });
      },
      error: errors,
    });
  }

  return {
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
  };
}
