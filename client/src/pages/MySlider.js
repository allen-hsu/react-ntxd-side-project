import React from "react";
import { connect } from "react-redux";
import { Layout, Row, Select, Checkbox } from "antd";
import styled from "styled-components";
import {
  changeDay,
  changeHour,
  changePlaceType,
  changeMapType,
  changeScoreType,
  changeAdsType
} from "../actions";
const { Sider } = Layout;
const { Option } = Select;

const BorderWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px 0 10px 0;
  transition: 0.3s;
  border-radius: 5px;
`;
const CheckBoxWrapper = styled.div`
  justify-content: center;
  display: flex;
`;
const HeaderWrapper = styled.div`
  color: white;
  top: 0;
  font-size: 24px;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 50px;
  display: flex;
`;

const DesrcWrapper = styled.div`
  color: white;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  display: flex;
`;

const SelectWrapper = styled.div`
  margin-bottom: 10px;
`;

const SubHeaderWrapper = styled.div`
  color: white;
  margin-bottom: 10px;
`;

class MySlider extends React.Component {
  onDayChange = value => {
    this.props.onChangeDay(value);
  };

  onHourChange = value => {
    this.props.onChangeHour(value);
  };

  onPlaceCheckChane = value => {
    this.props.onChangePlaceType(value);
  };

  onMapChange = value => {
    this.props.onChangeMapType(value);
  };

  onScoreChane = value => {
    this.props.onChangeScoreType(value);
  };
  onAdsChange = value => {
    this.props.onChangeAdsType(value);
  };
  // restaurant|cafe|night_club|movie_theater|shoe_store|book_store|clothing_store|shopping_mall|store
  render() {
    const placeTypeOptions = [
      { label: "餐廳(RESTAURANT)", value: "restaurant" },
      { label: "咖啡廳(CAFE)", value: "cafe" },
      { label: "電影院(MOVIE_THEATER)", value: "movie_theater" },
      { label: "鞋店(SHOE_STORE)", value: "shoe_store" },
      { label: "書店(BOOK_STORE)", value: "book_store" },
      { label: "服飾店(CLOTHING_STORE)", value: "clothing_store" },
      { label: "購物中心(SHOPPING_MALL)", value: "shopping_mall" },
      { label: "商店(STORE)", value: "store" }
    ];

    const hoursOptions = [
      { label: "00:00", value: 0 },
      { label: "01:00", value: 1 },
      { label: "02:00", value: 2 },
      { label: "03:00", value: 3 },
      { label: "04:00", value: 4 },
      { label: "05:00", value: 5 },
      { label: "06:00", value: 6 },
      { label: "07:00", value: 7 },
      { label: "08:00", value: 8 },
      { label: "09:00", value: 9 },
      { label: "10:00", value: 10 },
      { label: "11:00", value: 11 },
      { label: "12:00", value: 12 },
      { label: "13:00", value: 13 },
      { label: "14:00", value: 14 },
      { label: "15:00", value: 15 },
      { label: "16:00", value: 16 },
      { label: "17:00", value: 17 },
      { label: "18:00", value: 18 },
      { label: "19:00", value: 19 },
      { label: "20:00", value: 20 },
      { label: "21:00", value: 21 },
      { label: "22:00", value: 22 },
      { label: "23:00", value: 23 }
    ];

    const daysOptions = [
      { label: "星期一,Monday", value: 0 },
      { label: "星期二,Tuesday", value: 1 },
      { label: "星期三,Wednesday", value: 2 },
      { label: "星期四,Thursday", value: 3 },
      { label: "星期五,Friday", value: 4 },
      { label: "星期六,Staturday", value: 5 },
      { label: "星期日,Sunday", value: 6 }
    ];

    const mapTypesOptions = [
      { label: "熱點圖", value: 0 },
      { label: "Marker圖", value: 1 }
    ];

    const scoreTypesOptions = [
      { label: "0~1分", value: 0 },
      { label: "1~2分", value: 1 },
      { label: "2~3分", value: 2 },
      { label: "3~4分", value: 3 },
      { label: "4~5分", value: 4 }
    ];

    const adTypsOptions = [
      { label: "電商/電子服務", value: 0 },
      { label: "應用程式/遊戲", value: 1 },
      { label: "美妝/美容/美髮", value: 2 },
      { label: "日常生活用品", value: 3 },
      { label: "財務金融保險", value: 4 },
      { label: "休閒娛樂", value: 5 },
      { label: "零售產業", value: 6 },
      { label: "汽車產業", value: 7 },
      { label: "科技3C產業", value: 8 }
    ];

    return (
      <Sider width={400}>
        <HeaderWrapper>數位戶外媒體人流預測</HeaderWrapper>
        {/* <BorderWrapper>
          <Row type="flex" justify="center">
            計算方式 :
          </Row>
          <Row type="flex" justify="center">
            <DesrcWrapper>人流 + 評分 + 智能合約</DesrcWrapper>
            <DesrcWrapper>評分數量(如低於2分，評分數加權)</DesrcWrapper>
          </Row>
        </BorderWrapper> */}
        <BorderWrapper>
          <Row type="flex" justify="center">
            <SubHeaderWrapper>地圖展示類型選擇</SubHeaderWrapper>
          </Row>
          <Row gutter={8} type="flex" justify="center">
            <SelectWrapper>
              <Select
                defaultValue={mapTypesOptions[0].label}
                style={{ width: 250 }}
                onChange={this.onMapChange}
              >
                {mapTypesOptions.map(type => (
                  <Option key={type.label} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </SelectWrapper>
          </Row>
        </BorderWrapper>

        <BorderWrapper>
          <Row type="flex" justify="center">
            <SubHeaderWrapper>評分範圍選擇</SubHeaderWrapper>
          </Row>
          <Row gutter={8} type="flex" justify="center">
            <SelectWrapper>
              <Select
                defaultValue={scoreTypesOptions[0].label}
                style={{ width: 250 }}
                onChange={this.onScoreChane}
              >
                {scoreTypesOptions.map(type => (
                  <Option key={type.label} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </SelectWrapper>
          </Row>
        </BorderWrapper>

        <BorderWrapper>
          <Row type="flex" justify="center">
            <SubHeaderWrapper>投放廣告種類選擇</SubHeaderWrapper>
          </Row>
          <Row gutter={8} type="flex" justify="center">
            <SelectWrapper>
              <Select
                defaultValue={adTypsOptions[0].label}
                style={{ width: 250 }}
                onChange={this.onAdsChange}
              >
                {adTypsOptions.map(type => (
                  <Option key={type.label} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </SelectWrapper>
          </Row>
        </BorderWrapper>

        <BorderWrapper>
          <Row type="flex" justify="center">
            <SubHeaderWrapper>時段選擇 - DAY OF WEEKS</SubHeaderWrapper>
          </Row>
          <Row gutter={8} type="flex" justify="center">
            <SelectWrapper>
              <Select
                defaultValue={daysOptions[0].label}
                style={{ width: 250 }}
                onChange={this.onDayChange}
              >
                {daysOptions.map(day => (
                  <Option key={day.label} value={day.value}>
                    {day.label}
                  </Option>
                ))}
              </Select>
            </SelectWrapper>
          </Row>
        </BorderWrapper>

        <BorderWrapper>
          <Row type="flex" justify="center">
            <SubHeaderWrapper>時段選擇 - HOUR OF DAYS</SubHeaderWrapper>
          </Row>
          <Row gutter={8} type="flex" justify="center">
            <SelectWrapper>
              <Select
                defaultValue={hoursOptions[0].label}
                style={{ width: 250 }}
                onChange={this.onHourChange}
              >
                {hoursOptions.map(hour => (
                  <Option key={hour.label} value={hour.value}>
                    {hour.label}
                  </Option>
                ))}
              </Select>
            </SelectWrapper>
          </Row>
        </BorderWrapper>
        <BorderWrapper>
          <Row type="flex" justify="center">
            <SubHeaderWrapper>類型選擇 - PLACE TYPE</SubHeaderWrapper>
          </Row>
          <Row type="flex" justify="center">
            <CheckBoxWrapper>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={this.onPlaceCheckChane}
              >
                {placeTypeOptions.map(placeType => (
                  <Row key={placeType.label}>
                    <Checkbox value={placeType.value}>
                      {placeType.label}
                    </Checkbox>
                  </Row>
                ))}
              </Checkbox.Group>
            </CheckBoxWrapper>
          </Row>
        </BorderWrapper>
      </Sider>
    );
  }
}

// 將store中的items值傳綁到props上
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onChangeDay: day => dispatch(changeDay(day)),
  onChangeHour: hour => dispatch(changeHour(hour)),
  onChangePlaceType: type => dispatch(changePlaceType(type)),
  onChangeMapType: type => dispatch(changeMapType(type)),
  onChangeScoreType: type => dispatch(changeScoreType(type)),
  onChangeAdsType: type => dispatch(changeAdsType(type))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MySlider);
