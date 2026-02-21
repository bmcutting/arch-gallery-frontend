export enum LOCAL_STORAGE_KEY {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export class LocalStorage {
  static get(key: LOCAL_STORAGE_KEY): string | null {
    return window.localStorage.getItem(key);
  }

  static set(key: LOCAL_STORAGE_KEY, value: string): void {
    window.localStorage.setItem(key, value);
  }

  static remove(key: LOCAL_STORAGE_KEY): void {
    window.localStorage.removeItem(key);
  }
}
