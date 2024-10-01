import { useCallback } from "react";

export default function useAuth() {
  const getUser = useCallback(() => {
    //return user from sessionStorage
    return {
      id: 1,
      names: "Alejandro",
      paternalName: "Chacón",
      maternalName: "Fernández",
    };
  });

  const logIn = useCallback(() => {
    // get user from api
    // store in sessionStorage
  });

  return { getUser };
}
