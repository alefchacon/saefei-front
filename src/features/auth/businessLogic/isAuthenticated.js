import getUser from "./getUser";

const isAuthenticated = Boolean(getUser());

export default isAuthenticated;