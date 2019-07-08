import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getProducts, getBraintreeClientToken} from './apiCore';
import Card from "./Card"
import {isAuthenticated} from '../auth'
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {

  const [data,setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({...data, error: data.error})
      } else {
        setData({...data, clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(userId, token)
  }, [])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
        <div>
          {showDropIn()}
        </div>
      ) : (
        <Link to="/signin">
          <button className="btn btn-card btn-primary">
            Sign in, in order to check out
          </button>
        </Link>
      )
  }

  const purchase = () => {
    // send the nonce to your server
    // nonce = data.instance.requerstPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {
      console.log(data)
      nonce = data.nonce;
      // once you have nonce (type...) send nonce as 'paymentMethodNonce'
      // also the total amount
      console.log('send nonce and total process: ', nonce, getTotal(products));
    })
    .catch(error => {
      console.log('dropin error: ', error)
      setData({...data, error: error.message});
    })
  }

  const showDropIn = () => (
    <div onBlur={() => setData({...data, error: ""})}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn options={{
            authorization: data.clientToken
          }} onInstance={instance => (data.instance = instance)} />
          <button onClick={purchase} className="btn btn-success btn-card">Confirm Payment</button>
        </div>
      ) : null}
    </div>
  )

  const showError = error => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}  
      {showCheckout()}
    </div>

  )
}

export default Checkout