import React from "react";
import { Row, Col, Form, Icon, Input, Button, Typography } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import auth from "../utils/auth";

const { Text } = Typography;

let url = "https://node-react-recipe.herokuapp.com/";

class NormalLoginForm extends React.Component {
  state = {
    hasToken: auth.isAuthenticated(),
    faild: null,
    success: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        try {
          await axios.post(`${url}register`, { ...values }).then(res => {
            if (res.data.status) {
              this.setState({ faild: null, success: true });
              setTimeout(() => {
                this.props.history.push("/signin");
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
    if (this.state.hasToken) {
      return <Redirect to="/app" />;
    } else {
      return (
        <Row>
          <Col span={7} offset={8}>
            <div className="form__wrapper">
              <h1>Singup to Node React Recipe</h1>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Sign Up
                  </Button>
                  <br />
                  <Link to="signin">Signin Now!</Link>
                </Form.Item>
                {this.state.faild ? (
                  <Text type="danger" code>
                    Something Wrong. Try Again
                  </Text>
                ) : null}
                {this.state.success ? (
                  <Text type="warning" code>
                    Account created sucessfully. You will be redirect soon.
                  </Text>
                ) : null}
              </Form>
            </div>
          </Col>
        </Row>
      );
    }
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
