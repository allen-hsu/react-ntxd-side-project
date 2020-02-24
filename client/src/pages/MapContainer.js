import React, { Component } from "react";
import mapStyles from "../const/map-styles";
import XIMENDING_CENTER from "../const/la_center";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import Chat from "../components/Chat";
import { selectMarkerData } from "../actions";
class MapContainer extends Component {
  googleMapRef = React.createRef();

  constructor(props) {
    super(props);
    this.markers = [];
    this.data = [];
  }
  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&libraries=places&libraries=visualization`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.heapMap = this.createHeatMap(this.googleMap);
    });
  }

  createGoogleMap = () => {
    var map = new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: XIMENDING_CENTER[0],
        lng: XIMENDING_CENTER[1]
      },
      disableDefaultUI: true,
      heatmapLibrary: true,
      options: {
        styles: mapStyles
      }
    });
    return map;
  };

  createMarker = (markerEvent, position, iconUrl, label, data) => {
    var icon = {
      url: iconUrl, // url
      scaledSize: new window.google.maps.Size(50, 50), // scaled size
      origin: new window.google.maps.Point(0, 0), // origin
      anchor: new window.google.maps.Point(25, 25) // anchor
    };
    var marker = new window.google.maps.Marker({
      position: position,
      icon: icon,
      label: { text: label, color: "white" },
      map: this.googleMap,
      data: data
    });

    marker.addListener("click", function() {
      markerEvent(marker, "click");
    });

    this.markers.push(marker);
    return marker;
  };

  createHeatMap = map => {
    var heatmap = new window.google.maps.visualization.HeatmapLayer({
      map: map,
      data: [],
      radius: 15,
      opacity: 0.5
    });

    return heatmap;
  };

  markerEvent = (marker, event) => {
    this.props.onSelectMarker(marker.data);
  };

  clearAllMarker = () => {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
  };

  //current_popularity 目前人氣
  //time_spent 花費時間 min~max
  //time_wait 等待時間
  //populartimes 人流預測
  //rating 評分
  //rating_n 評分數
  getPrediction = (
    current_popularity,
    time_spent,
    time_wait,
    populartimes,
    rating,
    rating_n,
    name
  ) => {
    // predictionPopulartimes 人流              分母max100
    // predictionTimeSpent 花費時間(曝光率)       分母max120(分鐘)
    // predictionTimeWait 停留時間(曝光率加成)     分母max100(分鐘)
    // predictionRating 評分 (吸引來客)           分母 5
    // predictionRatingNum 評分數 (實際來客數量)   分母 1000
    // 人流(%50,滿分100) + 曝光率(%20, 滿分2hr(120分鐘))*(1+ 曝光率加成) + 吸客比(%20) + 10% for 廣告目前競標量 = final score

    var predictionCurrentPopularity = isEmpty(current_popularity)
      ? 0
      : current_popularity;
    var predictionTimeSpent = isEmpty(time_spent) ? [15, 45] : time_spent;
    var avgTimeSpent = (predictionTimeSpent[0] + predictionTimeSpent[1]) * 0.5;
    var predictionTimeWait = isEmpty(time_wait)
      ? 0
      : time_wait[this.props.selectDay].data[this.props.selectHour];
    var predictionPopulartimes = isEmpty(populartimes)
      ? 0
      : populartimes[this.props.selectDay].data[this.props.selectHour];
    var predictionRating = isEmpty(rating) ? 2.5 : rating;
    var predictionRatingNum = isEmpty(rating_n) ? 10 : rating_n;

    var score =
      predictionPopulartimes * 0.5 +
      avgTimeSpent * (1 + predictionTimeWait / 1000) * 0.2 +
      (predictionRatingNum / 1000) * (1 + predictionRating / 20) * 0.15 +
      predictionCurrentPopularity * 0.15;

    //Rating評分加成，最大20
    // console.log(score);
    //
    // console.log("店名 :" + name);
    // console.log("人流 :" + predictionPopulartimes);
    return predictionPopulartimes * 0.5;
  };

  getAdsTypeScore = types => {
    console.log(types);

    // restaurant|cafe|night_club|movie_theater|shoe_store|book_store|clothing_store|shopping_mall|store
    // render() {
    //   const placeTypeOptions = [
    //     { label: "餐廳(RESTAURANT)", value: "restaurant" },
    //     { label: "咖啡廳(CAFE)", value: "cafe" },
    //     { label: "電影院(MOVIE_THEATER)", value: "movie_theater" },
    //     { label: "鞋店(SHOE_STORE)", value: "shoe_store" },
    //     { label: "書店(BOOK_STORE)", value: "book_store" },
    //     { label: "服飾店(CLOTHING_STORE)", value: "clothing_store" },
    //     { label: "購物中心(SHOPPING_MALL)", value: "shopping_mall" },
    //     { label: "商店(STORE)", value: "store" }
    //   ];

    var score = 0;

    switch (this.props.selectAdsType) {
      case 0: //"電商/電子服務"
        if (
          types.includes("shopping_mall") ||
          types.includes("store") ||
          types.includes("movie_theater")
        ) {
          score += 1;
        }
        break;
      case 1: //"應用程式/遊戲"
        if (
          types.includes("shopping_mall") ||
          types.includes("store") ||
          types.includes("movie_theater") ||
          types.includes("restaurant")
        ) {
          score += 1;
        }
        break;
      case 2: //"美妝/美容/美髮"
        if (
          types.includes("shopping_mall") ||
          types.includes("store") ||
          types.includes("movie_theater") ||
          types.includes("restaurant") ||
          types.includes("clothing_store")
        ) {
          score += 1;
        }
        break;
      case 3: //"日常生活用品"
        if (
          types.includes("shopping_mall") ||
          types.includes("store") ||
          types.includes("movie_theater") ||
          types.includes("restaurant") ||
          types.includes("clothing_store")
        ) {
          score += 1;
        }
        break;
      case 4: //"財務金融保險"
        score += 1;
        break;
      case 5: //"休閒娛樂"
        if (
          types.includes("shopping_mall") ||
          types.includes("store") ||
          types.includes("movie_theater") ||
          types.includes("restaurant") ||
          types.includes("clothing_store")
        ) {
          score += 1;
        }
        break;
      case 6: //"零售產業"
        score += 1;
        break; //"汽車產業"
      case 7:
        score += 1;
        break;
      case 8: // "科技3C產業"
        score += 1;
        break;
      default:
        return score;
    }
  };

  getScore = (
    current_popularity,
    time_spent,
    time_wait,
    populartimes,
    rating,
    rating_n,
    types,
    name
  ) => {
    // predictionPopulartimes 人流              分母max100
    // predictionTimeSpent 花費時間(曝光率)       分母max120(分鐘)
    // predictionTimeWait 停留時間(曝光率加成)     分母max100(分鐘)
    // predictionRating 評分 (吸引來客)           分母 5
    // predictionRatingNum 評分數 (實際來客數量)   分母 1000

    var populartimesScore = isEmpty(populartimes)
      ? 0
      : populartimes[this.props.selectDay].data[this.props.selectHour] / 100;

    var timeSpentScore = isEmpty(time_spent) ? 0 : time_spent[1] / 120;
    var timeWaitScore = isEmpty(time_wait)
      ? 0
      : time_wait[this.props.selectDay].data[this.props.selectHour] / 100;
    var ratingScore = isEmpty(rating) ? 0 : rating / 5;
    var ratingNScore = isEmpty(rating_n) ? 0 : rating_n / 1000;
    if (ratingScore < 2) {
      ratingNScore *= -1;
    }

    var adsTypeScore = this.getAdsTypeScore(types);

    var score =
      populartimesScore +
      timeSpentScore +
      timeWaitScore +
      ratingScore +
      ratingNScore +
      adsTypeScore * 0.5;
    return score.toFixed(2);
  };

  getPredictionLabel = score => {
    return score.toString();
  };
  getPredictionIcon = score => {
    if (score < 1) {
      return "m1.png";
    } else if (score >= 1 && score < 2) {
      return "m2.png";
    } else if (score >= 2 && score < 3) {
      return "m3.png";
    } else if (score >= 3 && score < 4) {
      return "m4.png";
    } else {
      return "m5.png";
    }
  };
  getMarkerData = place => {
    return {
      name: place.name,
      populartimes: place.populartimes,
      time_spent: isEmpty(place.time_spent) ? [] : place.time_spent,
      time_wait: place.time_wait,
      rating: place.rating,
      rating_n: place.rating_n,
      score: place.score
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    var change = false;
    if (
      prevProps.selectDay !== this.props.selectDay ||
      prevProps.selectHour !== this.props.selectHour ||
      prevProps.selectPlaceType !== this.props.selectPlaceType
    ) {
      const places = this.props.placeData;

      if (!isEmpty(places)) {
        this.data = places
          .map(place => ({
            id: place.id,
            lat: place.coordinates.lat,
            lng: place.coordinates.lng,
            name: place.name,
            time_spent: place.time_spent,
            time_wait: place.time_wait,
            rating: place.rating,
            rating_n: place.rating_n,
            address: place.address,
            types: place.types,
            weight: this.getPrediction(
              place.current_popularity,
              place.time_spent,
              place.time_wait,
              place.populartimes,
              place.rating,
              place.rating_n,
              place.name
            ),
            score: this.getScore(
              place.current_popularity,
              place.time_spent,
              place.time_wait,
              place.populartimes,
              place.rating,
              place.rating_n,
              place.types,
              place.name
            ),
            populartimes: isEmpty(place.populartimes)
              ? 0
              : place.populartimes[this.props.selectDay].data[
                  this.props.selectHour
                ]
          }))
          .filter(place => {
            var isBool = false;

            if (place.populartimes <= 0) {
              return false;
            }
            for (var i = 0; i < this.props.selectPlaceType.length; ++i) {
              if (place.types.includes(this.props.selectPlaceType[i])) {
                isBool = true;
                break;
              }
            }
            return isBool;
          });

        change = true;
      }
    }

    if (
      change ||
      prevProps.selectMapType !== this.props.selectMapType ||
      prevProps.selectScoreType !== this.props.selectScoreType
    ) {
      this.clearAllMarker();
      if (this.props.selectMapType === 0) {
        var heapMapData = this.data.map(place => {
          return new window.google.maps.LatLng(place.lat, place.lng);
        });
        this.heapMap.setData(heapMapData);
      } else {
        this.data
          .filter(place => {
            console.log(this.props.selectScoreType);
            if (
              place.score > this.props.selectScoreType &&
              place.score < this.props.selectScoreType + 1
            ) {
              return true;
            }
            return false;
          })
          .map(place => {
            this.createMarker(
              this.markerEvent,
              {
                lat: place.lat,
                lng: place.lng
              },
              this.getPredictionIcon(place.score),
              this.getPredictionLabel(place.score),
              this.getMarkerData(place)
            );
          });
      }
    }
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "2",
            top: "0px",
            left: "82.5%"
          }}
        >
          <Chat></Chat>
        </div>
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSelectMarker: marker => dispatch(selectMarkerData(marker))
});
const mapStateToProps = state => ({
  selectDay: state.selector.selectDay,
  selectHour: state.selector.selectHour,
  selectPlaceType: state.selector.selectPlaceType,
  selectMapType: state.selector.selectMapType,
  selectScoreType: state.selector.selectScoreType,
  selectAdsType: state.selector.selectAdsType,
  placeData: state.place.placeData
});
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
