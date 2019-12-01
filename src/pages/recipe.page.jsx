import React from "react";
import axios from "axios";
import { Row, Col, Card, Skeleton, Typography, PageHeader } from "antd";

const { Meta } = Card;
const { Text } = Typography;

let url = "https://node-react-recipe.herokuapp.com/";
class Recipe extends React.Component {
  state = {
    recipe: {},
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${url}recipe/${this.props.match.params.id}`)
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
    console.log(recipe);
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
                <Card style={{ marginTop: 15 }}>
                  <img
                    src={recipe.mainImageURL}
                    alt={recipe.title}
                    style={{ width: "100%", marginBottom: "20px" }}
                  />
                  <Skeleton loading={false} active>
                    <Meta title={recipe.title} description={recipe.subTitle} />
                  </Skeleton>
                  {!loading && (
                    <Text style={{ marginTop: "16px" }}>
                      {recipe.description}
                    </Text>
                  )}
                  <br />
                  {!loading && (
                    <Text style={{ marginTop: "16px" }} mark>
                      {recipe.ending}
                    </Text>
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
