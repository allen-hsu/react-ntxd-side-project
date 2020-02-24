const defaultState = {
  selectHour: 0, //0-23
  selectDay: 0, //0-6
  selectPlaceType: [],
  selectMapType: 0, //0 or 1,
  selectScoreType: 0,
  selectAdType: 0
};

const selector = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_DAY":
      return { ...state, selectDay: action.day };
    case "CHANGE_HOUR":
      return { ...state, selectHour: action.hour };
    case "CHANGE_PLACE_TYPE":
      return { ...state, selectPlaceType: action.placeType };
    case "CHANGE_MAP_TYPE":
      return { ...state, selectMapType: action.mapType };
    case "CHANGE_SCORE_TYPE":
      return { ...state, selectScoreType: action.scoreType };
    case "CHANGE_ADS_TYPE":
      return { ...state, selectAdType: action.adsType };
    default:
      return state;
  }
};
export default selector;
