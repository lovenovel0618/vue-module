import { PROJECT_PREFIX } from "@/config/constant";

const TokenKey = `${PROJECT_PREFIX}-AUTH-TOKEN`;

export const getToken = (): string => {
  return localStorage.getItem(TokenKey) || "";
};

export const setToken = (token: string): void => {
  localStorage.setItem(TokenKey, token);
};

export const removeToken = (): void => {
  localStorage.setItem(TokenKey, "");
};
