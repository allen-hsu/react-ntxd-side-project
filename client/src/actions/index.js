export const changeDay = day => ({
  type: "CHANGE_DAY",
  day
});

export const changeHour = hour => ({
  type: "CHANGE_HOUR",
  hour
});

export const changePlaceType = placeType => ({
  type: "CHANGE_PLACE_TYPE",
  placeType
});

export const changeMapType = mapType => ({
  type: "CHANGE_MAP_TYPE",
  mapType
});

export const changeScoreType = scoreType => ({
  type: "CHANGE_SCORE_TYPE",
  scoreType
});
export const changeAdsType = adsType => ({
  type: "CHANGE_ADS_TYPE",
  adsType
});
export const fetchPlaceData = data => ({
  type: "FETCH_PLACE_DATA",
  data
});

export const selectMarkerData = data => ({
  type: "SELECT_MARKER_DATA",
  data
});

export const initWeb3 = data => ({
  type: "INIT_WEB3",
  data
});
