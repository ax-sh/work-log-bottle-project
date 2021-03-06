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
  DOMAIN: "https://bottle-work-log-api-project.herokuapp.com",
  // DOMAIN: "http://localhost:3001",
  getAllEmployees() {
    return employees;
  },
  getLogsForEmployee(id) {
    // just for fast prototyping purposes
    // ALWAYS sanitize code for security
    return axios
      .get(this.DOMAIN + "/logs?employeeId=" + id)
      .then((x) => x.data);
  },
  createLog(log) {
    return axios.post(this.DOMAIN + "/logs", log).then((x) => x.data);
  },
  getLogs() {
    return axios.get(this.DOMAIN + "/logs").then((x) => x.data);
  },
  populateDummyData() {
    this.getAllEmployees().forEach((i) => {
      const employeeId = i.id;
      Array(30)
        .fill(1)
        .map((x, y) => x + y)
        .forEach((i) => {
          const date = "2020/12/" + i;
          const start_time = "1:00";
          const end_time = "3:00";
          const remarks = "Normal work " + date;
          this.createLog({
            date,
            start_time,
            end_time,
            remarks,
            employeeId,
          });
        });
    });
  },
};

export default api;
