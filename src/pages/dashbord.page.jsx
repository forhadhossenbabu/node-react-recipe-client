import React from "react";
import { Button, Row, Col, Input, Alert } from "antd";
import auth from "../utils/auth";
import jwt_decode from "jwt-decode";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Recipes from "../components/recipes.component";
import PaginationComponent from "../components/pagination.component";
import api_url from "../utils/config";

class Dashbord extends React.Component {
  state = {
    user: jwt_decode(JSON.parse(localStorage.getItem("token"))),
    existingRecipes: [],
    currentPage: 1,
    recipePerPage: 4,
    searchingKey: "",
    searched: false
  };

  setCurrentPage = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  paginate = pageNumber => this.setCurrentPage(pageNumber);

  async componentDidMount() {
    this.setState({ loading: true });
    await axios
      .get(`${api_url}recipes`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      .then(res => {
        if (res.data.status) {
          this.setState({
            existingRecipes: res.data.existingRecipes
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
    this.setState({
      searchingKey: e.target.value.trim().toLowerCase()
    });
  };

  onSearchSubmit = async e => {
    e.preventDefault();
    const { searchingKey, existingRecipes } = this.state;

    if (searchingKey === "") {
      alert("Please enter recipe name.");
    } else {
      const mathcedRecipe = existingRecipes.filter(recipe =>
        recipe.title.toLowerCase().match(searchingKey)
      );

      this.setState({
        existingRecipes: mathcedRecipe,
        searched: true
      });
    }
  };

  handleDeleteRecipe = async recipeId => {
    this.setState({ loading: true });
    await axios
      .delete(`${api_url}deleteRecipe/${recipeId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      .then(res => {
        if (res.data.status) {
          this.setState({
            existingRecipes: res.data.existingRecipes
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

  handleRemoveSearch = async () => {
    await axios
      .get(`${api_url}recipes`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      .then(res => {
        if (res.data.status) {
          this.setState({
            existingRecipes: res.data.existingRecipes,
            searched: false,
            searchingKey: ""
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
    const {
      currentPage,
      recipePerPage,
      existingRecipes,
      searched,
      searchingKey
    } = this.state;
    const indexOfLastPost = currentPage * recipePerPage;
    const indexOfFirstPost = indexOfLastPost - recipePerPage;
    const currentRecipes = existingRecipes.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

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
                  <form onSubmit={this.onSearchSubmit} className="custom__form">
                    <Input
                      placeholder="Search By Recipe Name..."
                      onChange={this.handleSearchChange}
                      value={searchingKey}
                    />
                    <Button htmlType="submit">Search</Button>
                    {searched ? (
                      <Button onClick={this.handleRemoveSearch}>Clear</Button>
                    ) : null}
                  </form>
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
                {existingRecipes.length === 0 ? (
                  <Alert
                    style={{ marginTop: 16 }}
                    message="You Don't Have Recipe."
                    description="You can create a Recipe"
                    type="info"
                    showIcon
                  />
                ) : (
                  <div>
                    <Recipes
                      existingRecipes={currentRecipes}
                      handleDeleteRecipe={this.handleDeleteRecipe}
                    />
                    <PaginationComponent
                      recipePerPage={recipePerPage}
                      totalRecipes={existingRecipes.length}
                      paginate={this.paginate}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }
}

export default Dashbord;
