import React from "react";
import axios from "axios";
import api_url from "../utils/config";
import { Row, Col, Card, Skeleton, PageHeader } from "antd";

const { Meta } = Card;

class Recipe extends React.Component {
  state = {
    recipe: {},
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${api_url}recipe/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.status) {
          this.setState({
            recipe: res.data.recipe,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, recipe } = this.state;
    return (
      <div>
        <Row>
          <Col span={14} offset={5}>
            <PageHeader
              onBack={() => this.props.history.push("/app")}
              title="Node React Recipe View"
            />
            <div>
              {loading ? (
                <Card style={{ marginTop: 15 }}>
                  <Skeleton loading={true} active />
                </Card>
              ) : (
                <Card>
                  <img
                    src={recipe.mainImageURL}
                    alt={recipe.title}
                    style={{ width: "100%", marginBottom: "20px" }}
                  />
                  <Skeleton loading={false} active>
                    <Meta
                      title={"Title: " + recipe.title}
                      description={"Sub Title: " + recipe.subTitle}
                    />
                  </Skeleton>
                  {!loading && (
                    <p style={{ marginTop: 15 }}>
                      {"Description: " + recipe.description}
                    </p>
                  )}
                  {!loading && (
                    <p style={{ marginTop: "16px", marginBottom: "0px" }}>
                      {"Ending: " + recipe.ending}
                    </p>
                  )}
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Recipe;
