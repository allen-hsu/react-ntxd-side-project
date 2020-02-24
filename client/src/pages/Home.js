import React from "react";
import MySlider from "./MySlider";
import MyFooter from "./MyFooter";
import MapContainer from "./MapContainer";
import { connect } from "react-redux";
import { fetchPlaceData } from "../actions";

import { Layout } from "antd";

const { Content } = Layout;

class Home extends React.Component {
  componentDidMount() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        this.props.onFetchData(data);
      });
  }
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <MySlider></MySlider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <MapContainer></MapContainer>
          </Content>
          <MyFooter></MyFooter>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onFetchData: data => dispatch(fetchPlaceData(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
