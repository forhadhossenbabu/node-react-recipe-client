import axios from "axios";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(token, cb) {
    localStorage.setItem("token", JSON.stringify(token));
    axios.defaults.headers.common["Authorization"] = token;
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    localStorage.removeItem("token");
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      return (this.authenticated = true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      this.authenticated = false;
    }
    return this.authenticated;
  }
}

export default new Auth();
