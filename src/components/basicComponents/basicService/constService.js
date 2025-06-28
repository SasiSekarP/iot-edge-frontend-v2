import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_API + "/api";

export const getAuthHeader = () => {
  const token = Cookies.get("login_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// auth
export const LOGIN_URL = baseUrl + "/auth/login";
export const LOGOUT_URL = baseUrl + "/auth/logout";
export const FORGET_PASSWORD_URL = baseUrl + "/auth/forget-password";
export const RESET_PASSWORD_URL = baseUrl + "/auth/confirm-reset";
export const CURRENT_USER_URL = baseUrl + "/users/current-user";

// shift
export const SHIFT_URL = baseUrl + "/shift";

// configuration / firm
export const LOCATION_URL = baseUrl + "/location";
export const FIRM_URL = baseUrl + "/firm";

// configuration / user
export const ROLE_URL = baseUrl + "/roles";
export const USER_URL = baseUrl + "/users";