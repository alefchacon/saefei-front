import { useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import { User } from "../domain/user";
import * as CREDENTIAL_KEYS from "../../../stores/CREDENTIAL_KEYS";

export default function useAuth() {
  const [apiWrapper] = useApi();

  const getUser = useCallback(() => {
    const parsedUser = JSON.parse(
      localStorage.getItem(CREDENTIAL_KEYS.USER_KEY)
    );
    return new User(parsedUser);
  });

  const getToken = useCallback(() => {
    return localStorage.getItem(CREDENTIAL_KEYS.TOKEN_KEY);
  });

  const logIn = useCallback(async (credentials) => {
    apiWrapper.post("/login", credentials).then((response) => {
      console.log(credentials);
      console.log(response);
      const token = response.data.token;
      localStorage.setItem(CREDENTIAL_KEYS.TOKEN_KEY, token);

      const user = response.data.user;
      localStorage.setItem(CREDENTIAL_KEYS.USER_KEY, JSON.stringify(user));
      return response;
    });
  });

  return { getUser, logIn, getToken };
}
