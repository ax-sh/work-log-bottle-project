import { createStore, applyMiddleware } from "redux";

const actions = {
  CREATE_LOG: "CREATE_LOG",
  UPDATE_EMPLOYEES: "UPDATE_EMPLOYEES",
};

const initState = {
  logs: [],
  employees: [],
  currenrtUser: {},
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actions.CREATE_LOG:
      return { ...state, logs: [...state.logs, action.log] };
    case actions.UPDATE_EMPLOYEES:
      return { ...state, employees: [action.employees, ...state.employees] };
  }
}

const store = createStore(reducer);

export default store;
