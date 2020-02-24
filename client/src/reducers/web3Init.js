const defaultState = {
  data: {}
};

const web3Init = (state = defaultState, action) => {
  switch (action.type) {
    case "INIT_WEB3":
      console.log(action.data);
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};
export default web3Init;
