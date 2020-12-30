import { createStore, applyMiddleware } from "redux";

const actions = {
  CREATE_LOG: "CREATE_LOG",
  UPDATE_EMPLOYEES: "UPDATE_EMPLOYEES",
  UPDATE_LOGS: "UPDATE_LOGS",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  CLEAR_CURRENT_USER: "CLEAR_CURRENT_USER",
};

const initState = {
  logs: [],
  employees: [],
  currentUser: {},
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actions.CREATE_LOG:
      return { ...state, logs: [...state.logs, action.log] };
    case actions.UPDATE_EMPLOYEES:
      return { ...state, employees: [...action.employees, ...state.employees] };
    case actions.UPDATE_LOGS:
      return { ...state, logs: action.logs };
    case actions.SET_CURRENT_USER:
      return { ...state, currentUser: action.currentUser };
    case actions.CLEAR_CURRENT_USER:
      return { ...state, currentUser: {} };
  }
}

const store = createStore(reducer);

export default store;
