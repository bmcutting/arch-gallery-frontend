import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../../../modules/user/services/create-user";
import { SignUpValidator } from "../../../../modules/user/domain/validator/signup/signup-validator";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "../../../../modules/app/entities/local-storage";
import type { HttpResponseError } from "../../../../modules/app/modules/http/domain/error";
import { HttpStatusCode } from "axios";
import { loginUser } from "../../../../modules/user/services/login-user";

export default function useSignUp() {
  const router = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    userName: false,
    lastName: false,
  });

  function handleStepOneSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTouched = { ...touched };
    if (!email) newTouched.email = true;
    if (!firstName) newTouched.firstName = true;
    if (!lastName) newTouched.lastName = true;
    if (!userName) newTouched.userName = true;
    setTouched(newTouched);

    if (!email || !firstName || !lastName || !userName) {
      setError("Completa todos los campos");
      return;
    }
    setStep(2);
  }

  function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTouched = { ...touched };
    if (!password) newTouched.password = true;
    if (!confirmPassword) newTouched.confirmPassword = true;
    setTouched(newTouched);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

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
          .then(() => {
            return loginUser({ email, password });
          })
          .then((loginData) => {
            LocalStorage.set(
              LOCAL_STORAGE_KEY.ACCESS_TOKEN,
              loginData.access_token,
            );

            router("/home", { replace: true });
          })
          .catch((e: HttpResponseError) => {
            if (e.status === HttpStatusCode.Conflict) {
              setError("Ya existe un usuario con este correo");
            } else {
              setError("Hubo un error al crear el usuario");
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
    step,
    setStep,
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
    setEmail,
    setPassword,
    setConfirmPassword,
    setFirstName,
    setLastName,
    setUserName,
  };
}
