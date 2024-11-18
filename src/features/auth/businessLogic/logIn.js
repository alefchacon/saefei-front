import {apiClient} from "../../../dataAccess/api";
import * as AUTH_KEYS from "../../../stores/authKeys";

const logIn = async (credentials) => {
  const response = await apiClient.post("/login", credentials).then((response) => {
    const token = response.data.token;
    console.log(token)
    localStorage.setItem(AUTH_KEYS.TOKEN_KEY, token);

    const user = response.data.user;
    localStorage.setItem(AUTH_KEYS.USER_KEY, JSON.stringify(user));

    localStorage.setItem(AUTH_KEYS.LOGGEDIN_KEY, 1);
    return response;
  });

  return response;
};

export default logIn;