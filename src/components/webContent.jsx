import React, { Component } from "react";
import { useSearchParams, Link } from "react-router-dom";
class WebContent extends Component {
  state = {
    serchParams: this.props.params[0],
    setSerchParams: this.props.params[1],
  };
  render() {
    return (
      <>
        <h1>Web - {this.state.serchParams.get("chapter")}</h1>
        <div>内容</div>
        <hr />
        <Link to="/web">返回</Link>
      </>
    );
  }
}

export default function WebContentWrapper(props) {
  return <WebContent {...props} params={useSearchParams()} />;
}
