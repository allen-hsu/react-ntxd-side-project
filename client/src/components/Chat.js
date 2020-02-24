import React, { Component } from "react";
import { Statistic, Row, Col, Icon, Card, Rate, Button } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { XYPlot, HorizontalBarSeries, XAxis, YAxis } from "react-vis";

const HeaderWrapper = styled.div`
  color: white;
  top: 0;
  font-size: 24px;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 0px;
  display: flex;
`;
const Wrapper = styled.div`
  width: 350px;
  height: 100%;
`;
const SubHeaderWrapper = styled.div`
  color: white;
  margin-bottom: 10px;
`;

// predictionPopulartimes 人流
// predictionTimeSpent 花費時間(曝光率)
// predictionTimeWait 停留時間(曝光率加成)
// predictionRating 評分 (吸引來客)
// predictionRatingNum 評分數 (實際來客數量)

class Chat extends Component {
  onBuyAd = async () => {
    console.log("買");
    const { accounts, instance } = this.props;

    console.log(accounts);
    console.log(instance);
    // Stores a given value, 5 by default.
    await instance.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await instance.methods.get().call();
    console.log(response);
  };

  getHour = value => {
    if (value % 30 === 0) {
      return value / 60 + "小時";
    } else {
      if (value < 30) {
        return value + "分鐘";
      }
      var h = value / 60;
      var m = value % 60;
      if (h === 0) {
        return m + "分鐘";
      } else {
        return h + "小時" + m + "分鐘";
      }
    }
  };
  render() {
    const mark = this.props.markData;
    console.log(mark);

    var min = this.getHour(isEmpty(mark) ? 0 : mark.time_spent[0]);
    var max = this.getHour(isEmpty(mark) ? 0 : mark.time_spent[1]);

    var time_spent_label = "";
    if (min === max) {
      time_spent_label = min;
    } else {
      time_spent_label = min + "~" + max;
    }
    if (isEmpty(mark.time_spent)) {
      time_spent_label = "無此資料";
    }
    return (
      <Wrapper>
        <Col gutter={16}>
          <Card>
            <Row type="flex" justify="center" span={12}>
              <HeaderWrapper>
                {isEmpty(mark.name) ? "請選擇一個地點" : mark.name}
              </HeaderWrapper>
            </Row>

            <Row type="flex" justify="center" span={12}>
              <Statistic
                title="平均評分"
                value={mark.score}
                suffix="/ 5"
                valueStyle={{ color: "white" }}
                prefix={<Icon type="radar-chart" />}
              />
            </Row>
            <Row
              type="flex"
              justify="center"
              span={12}
              style={{ marginTop: "10px" }}
            >
              <SubHeaderWrapper>
                {(isEmpty(mark) ? 0 : mark.rating_n).toString() + "則評論"}
              </SubHeaderWrapper>
            </Row>
            <Row type="flex" justify="center" span={12}>
              <SubHeaderWrapper>{"Google評分"}</SubHeaderWrapper>
            </Row>
            <Row type="flex" justify="center" span={12}>
              <Rate
                allowHalf
                disabled
                value={isEmpty(mark) ? 0 : mark.rating}
              />
            </Row>

            <Row
              type="flex"
              justify="center"
              span={12}
              style={{ marginTop: "10px" }}
            >
              <SubHeaderWrapper>
                {isEmpty(mark) ? "" : "平均停留" + time_spent_label}
              </SubHeaderWrapper>
            </Row>
            <Row
              type="flex"
              justify="center"
              span={12}
              style={{ marginTop: "10px" }}
            >
              <XYPlot
                width={300}
                height={55}
                yType="ordinal"
                margin={{ left: 70 }}
                xDomain={[0, 100]}
              >
                <YAxis style={{ fill: "white" }} />
                <XAxis style={{ fill: "white" }} tickValues={[0, 100]} />
                <HorizontalBarSeries
                  animation={{ duration: 0.5 }}
                  data={[
                    {
                      x: isEmpty(mark) ? 0 : mark.populartimes,
                      y: "人流"
                    }
                  ]}
                  color="#28b7e0"
                  fill="#28b7e0"
                  // stroke="red"
                  style={{ rx: "5", ry: "5" }}
                />
              </XYPlot>
            </Row>

            <Row
              type="flex"
              justify="center"
              span={12}
              style={{ marginTop: "10px" }}
            >
              <SubHeaderWrapper>
                {"當前時段該地點投放最高價格" + 10 + "元/小時"}
              </SubHeaderWrapper>
            </Row>
            <Row
              type="flex"
              justify="center"
              span={12}
              style={{ marginTop: "10px" }}
            >
              <Button onClick={this.onBuyAd}>投放</Button>
            </Row>
          </Card>
        </Col>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  markData: state.markSelector.markData,
  selectAdsType: state.selector.selectAdsType,
  selectPlaceType: state.selector.selectPlaceType,
  web3: state.web3Init.data.web3,
  instance: state.web3Init.data.instance,
  accounts: state.web3Init.data.accounts
});

export default connect(mapStateToProps)(Chat);
