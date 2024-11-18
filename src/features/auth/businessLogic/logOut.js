import {apiClient} from "../../../dataAccess/api";
import * as AUTH_KEYS from "../../../stores/authKeys";

const logOut = async (credentials) => {
  const response = await apiClient.post("/logout", credentials).then((response) => {
    const token = response.data.token;
        
    localStorage.removeItem(AUTH_KEYS.TOKEN_KEY);
    localStorage.removeItem(AUTH_KEYS.USER_KEY);
    localStorage.removeItem(AUTH_KEYS.LOGGEDIN_KEY);
    return response;
  });

  return response;
};

export default logOut;