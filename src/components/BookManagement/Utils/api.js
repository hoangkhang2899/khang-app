import axios from "axios";

const url = "http://localhost:3001/";

function get(endpoint, opt = {}) {
  return axios.get(url + endpoint, opt);
}

function post(endpoint, data, opt = {}) {
  return axios.post(url + endpoint, data, opt);
}
function getWithAuth(endpoint, opt = {}) {
  const token = localStorage.getItem("token");
  return axios.get(url + endpoint, {
    headers: { Authorization: "Bearer " + token },
    ...opt,
  });
}

function postWithAuth(endpoint, data, opt = {}) {
  const token = localStorage.getItem("token");
  return axios.post(url + endpoint, data, {
    headers: { Authorization: "Bearer " + token },
    ...opt,
  });
}

async function isAdmin(opt = {}) {
  const token = localStorage.getItem("token");
  return axios
    .get(url + "authorization", {
      headers: { Authorization: "Bearer " + token },
      ...opt,
    })
    .then((res) => {
      if (res.data.role === "admin") return Promise.resolve();
      else {
        localStorage.removeItem("token");
        return Promise.reject("Invalid authorization");
      }
    });
}

const api = { get, post, getWithAuth, postWithAuth, isAdmin };
export default api;
