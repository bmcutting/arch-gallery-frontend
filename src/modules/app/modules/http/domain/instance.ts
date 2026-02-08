import axios, { HttpStatusCode } from "axios";
import { API_ROUTE } from "../../../domain/constants/env";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "../../../entities/local-storage";
import type { HttpResponseError } from "./error";
import { APP_ROUTES } from "../../../domain/constants/app-routes";

const instance = axios.create({
  baseURL: API_ROUTE,
});

instance.interceptors.request.use(
  (config) => {
    const token = LocalStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const handleError = (error: unknown): HttpResponseError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        message:
          error.response.data?.message ||
          error.response.statusText ||
          "Error en la petición",
        status: error.response.status,
      };
    }

    if (error.request) {
      return {
        message: "No se pudo conectar al servidor",
        status: HttpStatusCode.InternalServerError,
      };
    }

    return {
      message: error.message || "Error desconocido",
      status: HttpStatusCode.InternalServerError,
    };
  }

  return {
    message: error instanceof Error ? error.message : "Error desconocido",
    status: HttpStatusCode.InternalServerError,
  };
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const e = handleError(error);

    if (e.status === HttpStatusCode.Unauthorized) {
      LocalStorage.remove(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      window.location.href = APP_ROUTES.LOGIN;
    }
    return Promise.reject(e);
  },
);

export { instance };
