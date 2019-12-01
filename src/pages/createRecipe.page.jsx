import React from "react";
import { Form, Input, Button, Typography, Row, Col, PageHeader } from "antd";
import axios from "axios";
const { Text } = Typography;

let url = "https://node-react-recipe.herokuapp.com/";

class CreateRecipeForm extends React.Component {
  state = {
    faild: null,
    success: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        try {
          await axios
            .post(
              `${url}createRecipe`,
              { ...values },
              {
                headers: {
                  Authorization: JSON.parse(localStorage.getItem("token"))
                }
              }
            )
            .then(res => {
              if (res.data.status) {
                this.setState({ faild: null, success: true });
                setTimeout(() => {
                  this.props.history.push("/app");
                }, 3000);
              }
            });
        } catch (excp) {
          this.setState({ faild: true });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={7} offset={8}>
          <div className="container">
            <div className="create__recipe">
              <PageHeader
                onBack={() => this.props.history.push("/app")}
                title="Create New Recipe"
              />
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your recipe title!"
                      }
                    ]
                  })(<Input placeholder="Recipe Title" />)}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("subTitle", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your recipe sub title!"
                      }
                    ]
                  })(<Input placeholder="Recipe Sub Title" />)}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your recipe description!"
                      }
                    ]
                  })(<Input placeholder="Recipe Description" />)}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("mainImageURL", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your recipe main image URL!"
                      }
                    ]
                  })(<Input placeholder="Recipe Main Image URL" />)}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("ending", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your recipe ending"
                      }
                    ]
                  })(<Input placeholder="Recipe Main Ending" />)}
                </Form.Item>

                <Form.Item>
                  <div className="double__btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Submit New Recipe
                    </Button>
                  </div>
                </Form.Item>
                {this.state.faild ? (
                  <Text type="danger" code>
                    Something Wrong. Try Again
                  </Text>
                ) : null}
                {this.state.success ? (
                  <Text type="warning" code>
                    New Recipe sucessfully created.
                  </Text>
                ) : null}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const CreateRecipe = Form.create({ name: "normal_login" })(CreateRecipeForm);

export default CreateRecipe;
