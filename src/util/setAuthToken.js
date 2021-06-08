import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    token = axios.defaults.headers.common("x-auth-token");
  } else {
    delete axios.defaults.headers.common("x-auth-token");
  }
};
export default setAuthToken;