const LOCALSTORAGE_JWT_ID = "nitoUserToken";

export const getUserToken = (): string | null => {
  const token = window.localStorage.getItem(LOCALSTORAGE_JWT_ID);
  if (token === null) {
    return null;
  }
  return token;
};

export const setUserToken = (token: string): void => {
  window.localStorage.setItem(LOCALSTORAGE_JWT_ID, token);
};

export const removeUserToken = (): void => {
  window.localStorage.removeItem(LOCALSTORAGE_JWT_ID);
};
