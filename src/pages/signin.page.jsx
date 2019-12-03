import React from "react";
import { Row, Col, Form, Icon, Input, Button, Typography } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import auth from "../utils/auth";
import api_url from "../utils/config";

const { Text } = Typography;

class NormalLoginForm extends React.Component {
  state = {
    hasToken: auth.isAuthenticated(),
    faild: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        try {
          await axios.post(`${api_url}login`, { ...values }).then(res => {
            if (res.data.status) {
              auth.login(res.data.token, () => this.props.history.push("/app"));
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
              <h1>Singin to Node React Recipe</h1>
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
                    Log in
                  </Button>
                  <br />
                  <Link to="signup">Signup Now!</Link>
                </Form.Item>
                {this.state.faild ? (
                  <Text type="danger" code>
                    Something Wrong. Try Again
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
