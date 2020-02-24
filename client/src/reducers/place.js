const defaultState = {
  placeData: [],
};


const place = (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_PLACE_DATA":
      return { ...state, placeData: action.data };
    default:
      return state;
  }
};
export default place;
