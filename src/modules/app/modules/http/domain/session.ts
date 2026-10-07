import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "@modules/app/entities/local-storage";
import { APP_ROUTES } from "@modules/app/domain/constants/app-routes";

type SessionExpiredHandler = () => void;

let sessionExpiredHandler: SessionExpiredHandler | null = null;

export function setSessionExpiredHandler(handler: SessionExpiredHandler | null) {
  sessionExpiredHandler = handler;
}

export function clearSession() {
  LocalStorage.remove(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  LocalStorage.remove(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
}

export function expireSession() {
  clearSession();

  if (sessionExpiredHandler) {
    sessionExpiredHandler();
  } else {
    window.location.href = APP_ROUTES.LOGIN;
  }
}
