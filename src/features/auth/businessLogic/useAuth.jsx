import { useCallback } from "react";
import { User } from "../domain/user";
import * as AUTH_KEYS from "../../../stores/authKeys";

export default function useAuth() {
  const getUser = useCallback(() => {
    const parsedUser = JSON.parse(localStorage.getItem(AUTH_KEYS.USER_KEY));
    if (!Boolean(parsedUser)) {
      return null;
    }
    return new User(parsedUser);
  });

  const getToken = useCallback(() => {
    return localStorage.getItem(AUTH_KEYS.TOKEN_KEY);
  });

  return { getUser, getToken };
}
