
const names = ["Olivia", "Emma", "Ava", "Sophia", "Isabella"];
const admins = [0]
const employees = names.map((i, n) => ({
  name: i,
  id:n,
  image: `https://randomuser.me/api/portraits/women/${n}.jpg`,
  isAdmin:admins.indexOf(n)>-1
}));

const api = {
    getAllEmployees(){
        return employees
    },
    getEmployee(id){

    },
    getEmployeeLog(id){

    }
}

export default api