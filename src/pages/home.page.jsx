import React from "react";
import auth from "../utils/auth";

class Home extends React.Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.history.push("/app");
    }
  }

  render() {
    return (
      <div className="homepage">
        <h3>this is the home page</h3>
      </div>
    );
  }
}

export default Home;
