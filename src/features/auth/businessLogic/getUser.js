import { User } from "../domain/user";
import * as AUTH_KEYS from "../../../stores/AUTH_KEYS";

const getUser = () => {
  const parsedUser = JSON.parse(localStorage.getItem(AUTH_KEYS.USER_KEY));
  if (!Boolean(parsedUser)) {
    return null;
  }
  return new User(parsedUser);
}

export default getUser;