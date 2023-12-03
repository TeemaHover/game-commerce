import React from "react";

const Cards = ({ product, addToCart }) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <h2 className="card-title">${product.price}</h2>
        <div className="card-actions justify-end">
          <button className="btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
