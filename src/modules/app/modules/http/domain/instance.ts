import axios, { HttpStatusCode } from "axios";
import { API_ROUTE } from "@modules/app/domain/constants/env";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "@modules/app/entities/local-storage";
import type { HttpResponseError } from "./error";
import { expireSession } from "./session";

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

// El backend revoca el refresh token en cuanto se usa: si varias peticiones
// reciben 401 a la vez, todas tienen que esperar al mismo refresh. Con un
// refresh por peticion solo ganaria una y el resto cerraria la sesion.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (refreshToken: string): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_ROUTE}/auth/refresh`, { refresh_token: refreshToken })
      .then(({ data }) => {
        LocalStorage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.access_token);
        LocalStorage.set(LOCAL_STORAGE_KEY.REFRESH_TOKEN, data.refresh_token);
        return data.access_token as string;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const e = handleError(error);
    const originalRequest = error.config;

    // Un 401 de auth/login o auth/register son credenciales incorrectas: no se
    // arregla refrescando. Y una peticion ya reintentada no se reintenta otra vez.
    const isAuthRoute = /^\/?auth\//.test(originalRequest?.url ?? "");

    if (
      e.status === HttpStatusCode.Unauthorized &&
      !isAuthRoute &&
      !originalRequest?._retry
    ) {
      const refreshToken = LocalStorage.get(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

      if (refreshToken) {
        try {
          const accessToken = await refreshAccessToken(refreshToken);

          originalRequest._retry = true;
          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          expireSession();
          return Promise.reject(refreshError);
        }
      } else {
        expireSession();
      }
    }
    return Promise.reject(e);
  },
);

export { instance };
