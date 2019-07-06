import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from "./Card"
import {isAuthenticated} from '../auth'

const Checkout = ({products}) => {

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
        <button className="btn btn-card btn-success">
          Checkout
        </button>
      ) : (
        <Link to="/signin">
          <button className="btn btn-card btn-primary">
            Sign in, in order to check out
          </button>
        </Link>
      )
  }

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      
      {showCheckout()}
    </div>

  )
}

export default Checkout