import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import AddProduct from '../admin/AddProduct'
import ShowImage from './ShowImage';
import moment from 'moment'
import {addItem, updateItem, removeItem} from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  dislayAddToCartButton = true,
  displayRemoveProductButton = false,
  cartUpdate = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-card btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = dislayAddToCartButton => {
    return (
      dislayAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-card btn-outline-warning mt-2 mb-2 center"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveButton = displayRemoveProductButton => {
    return (
      displayRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-outline-danger btn-card mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="">Out of Stock</span>
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };

  return (
    <div className="card">
      {/* <div className="card-header name">{product.name}</div> */}
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <h4>{product.name}</h4>
        <p className="lead mt-2">{product.description.substring(0, 50)}...</p>
        <p className="black-10">${product.price}</p>
        {/* <p className="black-9">
          Category: {product.category && product.category.name}
        </p> */}
        {/* <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p> */}
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCartButton(dislayAddToCartButton)}
        {showRemoveButton(displayRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card
