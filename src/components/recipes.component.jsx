import React from "react";
import { Skeleton, Card, Icon, Modal, Alert } from "antd";
import { withRouter } from "react-router-dom";

const { Meta } = Card;

const { confirm } = Modal;

const Recipes = ({ existingRecipes, loading, handleDeleteRecipe, history }) => {
  function showConfirm(recipeId) {
    confirm({
      title: "Do you want to delete these items?",
      content:
        "When clicked the OK button, this recipe will be deleted from the system",
      onOk() {
        handleDeleteRecipe(recipeId);
      },
      onCancel() {}
    });
  }

  return (
    <div>
      {loading ? (
        <Card style={{ marginTop: 20 }}>
          <Skeleton loading={true} active />
        </Card>
      ) : (
        <div>
          {existingRecipes.length === 0 ? (
            <Alert
              style={{ marginTop: 16 }}
              message="You Don't Have Recipe."
              description="You can create a Recipe"
              type="info"
              showIcon
            />
          ) : (
            existingRecipes.map((recipe, idx) => (
              <Card
                style={{ marginTop: 16 }}
                actions={[
                  <Icon
                    type="layout"
                    theme="twoTone"
                    key="view"
                    onClick={() => history.push(`/app/recipe/${recipe.id}`)}
                  />,
                  <Icon
                    type="edit"
                    key="edit"
                    theme="twoTone"
                    onClick={() =>
                      history.push(`/app/edit-recipe/${recipe.id}`)
                    }
                  />,
                  <Icon
                    type="close-circle"
                    key="delete recipe"
                    theme="twoTone"
                    onClick={() => showConfirm(recipe.id)}
                  />
                ]}
                key={idx}
              >
                <Skeleton loading={false} active>
                  <Meta title={recipe.title} description={recipe.subTitle} />
                </Skeleton>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(Recipes);
