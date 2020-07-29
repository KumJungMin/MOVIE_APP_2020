import React from "react";

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");    //리다이렉션
    }
  }
  render() {
    const { location } = this.props;   //보내온 정보중에서 lication이 정의되 있다면~
    if (location.state) {
      return <span>{location.state.title}</span>;
    } else {
      return null;
    }
  }
}
export default Detail;
