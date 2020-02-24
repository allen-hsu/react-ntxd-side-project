const defaultState = {
  markData: {}
};

const markSelector = (state = defaultState, action) => {
  switch (action.type) {
    case "SELECT_MARKER_DATA":
      return { ...state, markData: action.data };
    default:
      return state;
  }
};
export default markSelector;
