import axios from "axios";

const names = ["Olivia", "Emma", "Ava", "Sophia", "Isabella"];
const admins = [0];
const employees = names.map((i, n) => ({
  name: i,
  id: n,
  image: `https://randomuser.me/api/portraits/women/${n}.jpg`,
  isAdmin: admins.indexOf(n) > -1,
}));

const api = {
  getAllEmployees() {
    return employees;
  },
  getLogsForEmployee(id) {
    return axios
      .get("http://localhost:3001/logs?employeeId=" + id)
      .then((x) => x.data);
  },
  createLog(log) {
    return axios.post("http://localhost:3001/logs", log);
  },
  getLogs() {
    return axios.get("http://localhost:3001/logs").then((x) => x.data);
  },
};

export default api;
