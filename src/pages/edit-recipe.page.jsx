import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  PageHeader,
  Typography,
  Spin
} from "antd";
import axios from "axios";
import auth from "../utils/auth";
import { Redirect } from "react-router-dom";
import { isLength, isURL } from "validator";

const { Text } = Typography;
let url = "https://node-react-recipe.herokuapp.com/";

class EditRecipePage extends React.Component {
  state = {
    recipe: {},
    loading: false,
    error: {}
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await axios
      .get(`${url}recipe/${this.props.match.params.id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      .then(res => {
        if (res.data.status) {
          this.setState({ recipe: res.data.recipe, loading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  handleChange = e => {
    const { recipe } = this.state;

    recipe[e.target.name] = e.target.value;

    this.setState({
      recipe,
      error: {}
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { recipe, error } = this.state;

    if (!isLength(recipe.title, { min: 4, max: 200 })) {
      error.title = "Title needs minimum 4 words";
    }
    if (!isLength(recipe.subTitle, { min: 4, max: 300 })) {
      error.subTitle = "Sub Title needs minimum 4 words";
    }
    if (!isLength(recipe.description, { min: 4 })) {
      error.description = "Description needs minimum 4 words";
    }
    if (!isURL(recipe.mainImageURL)) {
      error.mainImageURL = "A Image link is required";
    }
    if (!isLength(recipe.ending, { min: 4 })) {
      error.ending = "Ending needs minimum 4 words";
    }

    if (Object.keys(error).length > 0) {
      this.setState({ error });
    } else {
      this.setState({ loading: true });

      recipe.created_at = new Date();

      await axios
        .put(
          `${url}update-recipe/${this.props.match.params.id}`,
          { ...recipe },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("token"))
            }
          }
        )
        .then(res => {
          if (res.data.status) {
            this.props.history.push("/app");
          }
        })
        .catch(err => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    const { loading, recipe, error } = this.state;
    if (!auth.isAuthenticated()) {
      return <Redirect to="/" />;
    } else {
      return (
        <Row>
          <Col span={7} offset={8}>
            <div className="container">
              <div className="create__recipe">
                <PageHeader
                  onBack={() => this.props.history.push("/app")}
                  title="Update Recipe"
                />
                {loading ? (
                  <div className="spin">
                    <Spin />
                  </div>
                ) : (
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item className={error.title ? "has-error" : ""}>
                      <Input
                        placeholder="Recipe Title"
                        defaultValue={recipe["title"]}
                        onChange={this.handleChange}
                        name="title"
                      />
                      {error.title && <Text type="danger">{error.title}</Text>}
                    </Form.Item>

                    <Form.Item className={error.subTitle ? "has-error" : ""}>
                      <Input
                        placeholder="Recipe Sub Title"
                        onChange={this.handleChange}
                        name="subTitle"
                        defaultValue={recipe["subTitle"]}
                      />
                      {error.subTitle && (
                        <Text type="danger">{error.subTitle}</Text>
                      )}
                    </Form.Item>

                    <Form.Item className={error.description ? "has-error" : ""}>
                      <Input
                        placeholder="Recipe Description"
                        onChange={this.handleChange}
                        name="description"
                        defaultValue={recipe["description"]}
                      />
                      {error.description && (
                        <Text type="danger">{error.description}</Text>
                      )}
                    </Form.Item>

                    <Form.Item
                      className={error.mainImageURL ? "has-error" : ""}
                    >
                      <Input
                        placeholder="Recipe Main Image URL"
                        onChange={this.handleChange}
                        name="mainImageURL"
                        defaultValue={recipe["mainImageURL"]}
                      />
                      {error.mainImageURL && (
                        <Text type="danger">{error.mainImageURL}</Text>
                      )}
                    </Form.Item>

                    <Form.Item className={error.ending ? "has-error" : ""}>
                      <Input
                        placeholder="Recipe Main Ending"
                        onChange={this.handleChange}
                        name="ending"
                        defaultValue={recipe["ending"]}
                      />
                      {error.ending && (
                        <Text type="danger">{error.ending}</Text>
                      )}
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Update Recipe
                    </Button>
                  </Form>
                )}
              </div>
            </div>
          </Col>
        </Row>
      );
    }
  }
}

export default EditRecipePage;
