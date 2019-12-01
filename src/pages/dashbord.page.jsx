import React from "react";
import { Button, Row, Col, Input } from "antd";
import auth from "../utils/auth";
import jwt_decode from "jwt-decode";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Recipes from "../components/recipes.component";

let url = "https://node-react-recipe.herokuapp.com/";

class Dashbord extends React.Component {
  state = {
    user: jwt_decode(JSON.parse(localStorage.getItem("token"))),
    existingRecipes: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await axios
      .get(`${url}recipes`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      .then(res => {
        if (res.data.status) {
          this.setState({
            existingRecipes: res.data.existingRecipes,
            loading: false
          });
        }
      })
      .catch(err => {
        auth.logout(() => {
          this.setState({ user: null });
          this.props.history.push("/");
        });
      });
  }
  handleSearchChange = e => {
    const { existingRecipes } = this.state;

    this.setState({
      existingRecipes: existingRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(e.target.value)
      )
    });
  };

  handleDeleteRecipe = async recipeId => {
    this.setState({ loading: true });
    await axios
      .delete(`${url}deleteRecipe/${recipeId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      .then(res => {
        if (res.data.status) {
          this.setState({
            existingRecipes: res.data.existingRecipes,
            loading: false
          });
        }
      })
      .catch(err => {
        auth.logout(() => {
          this.setState({ user: null });
          this.props.history.push("/");
        });
      });
  };

  render() {
    const { existingRecipes, loading } = this.state;
    if (!auth.isAuthenticated()) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <div className="dashbord">
            <h2>Node React Recipe Dashbord</h2>
            <Row>
              <Col
                span={5}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Button type="primary">
                  <Link to="/app/create-recipe">Create Recipe</Link>
                </Button>
              </Col>
              <Col span={14}>
                <div className="search__form">
                  <Input
                    placeholder="Search By Recipe Name..."
                    onChange={this.handleSearchChange}
                  />
                  <Button>Search</Button>
                </div>
              </Col>
              <Col
                span={5}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Button
                  onClick={() =>
                    auth.logout(() => this.props.history.push("/"))
                  }
                  type="danger"
                >
                  Logout {this.state.user.username}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={14} offset={5}>
                <Recipes
                  loading={loading}
                  existingRecipes={existingRecipes}
                  handleDeleteRecipe={this.handleDeleteRecipe}
                />
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }
}

export default Dashbord;
