import { SESSION_STORAGE_KEY } from './constant';

class SessionStorage {
  public key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get() {
    if (typeof window !== undefined) {
      return sessionStorage.getItem(this.key);
    }
  }
  public set(sessioId: string) {
    if (typeof window !== undefined) {
      sessionStorage.setItem(this.key, sessioId);
    }
  }
  public clear() {
    if (typeof window !== undefined) {
      sessionStorage.clear();
    }
  }
}

export const accessSessionStorage = new SessionStorage(SESSION_STORAGE_KEY);
