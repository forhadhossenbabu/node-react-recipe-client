import React from "react";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

class Home extends React.Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.history.push("/app");
    }
  }

  render() {
    return (
      <div className="home">
        <header class="header">
          <h1 class="logo">Recipe App</h1>
          <ul class="nav">
            <li>
              <Link to="signin">Sing In</Link>
            </li>
            <li>
              <Link to="signup">Sing Up</Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default Home;
