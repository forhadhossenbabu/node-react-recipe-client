import React from "react";

const PaginationComponent = ({ recipePerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginate">
      <ul>
        {pageNumbers.map((number, idx) => (
          <li key={idx}>
            <a href="#!" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
