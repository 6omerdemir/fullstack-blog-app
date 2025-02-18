import axios from "axios";
export default class AuthService {
  login(loginData) {
    return axios.post("/auth/login", loginData);
  }

  register(registerData) {
    return axios.post("/auth/register", registerData);
  }
}