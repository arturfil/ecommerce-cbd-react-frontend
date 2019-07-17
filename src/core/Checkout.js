import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getProducts, getBraintreeClientToken, processPayment, createOrder} from './apiCore';
import {emptyCart} from './cartHelpers';
import Card from "./Card"
import {isAuthenticated} from '../auth'
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {

  const [data,setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ""
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({...data, error: data.error})
      } else {
        setData({clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(userId, token)
  }, [])

  const handleAddress = event => {
    setData({...data, address: event.target.value});
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  let deliveryAddress = data.address;

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
    setData({ loading: true});
    // send the nonce to your server
    // nonce = data.instance.requerstPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {
      nonce = data.nonce;
      // once you have nonce (type...) send nonce as 'paymentMethodNonce'
      // also the total amount
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products)
      }
      processPayment(userId, token, paymentData)
      .then(response => {
        const createOrderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
          address: deliveryAddress
        }
        createOrder(userId, token, createOrderData)

        setData({...data, success: response.success})
        emptyCart(() => {
          console.log('payment success and empty cart');
          setData({
             loading: false, 
             success: true 
          });
        })
        // empty cart & create order
      })
      .catch(error => {
        console.log(error);
        setData({ loading: false });
      })
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
          <div className="gorm-group mb-3">
            <label className="text-muted">
              Delivery Address:
            </label>
            <textarea 
              className="form-control"
              onChange={handleAddress}
              value={data.address}
              placeholder="Type your address here..."/>
          </div>
          <DropIn options={{
            authorization: data.clientToken,
            paypal: {
              flow: "vault"
            }
          }} onInstance={instance => (data.instance = instance)} />
          <button onClick={purchase} className="btn btn-success btn-block btn-card">Submit Payment</button>
        </div>
      ) : null}
    </div>
  )

  const showError = error => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const showSuccess = success => (
    <div className="alert alert-info" style={{display: success ? "": "none"}}>
      Thank your for your purchase!
    </div>
  )

  const showLoading = (loading) => loading && <h2>Loading...</h2>

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}  
      {showCheckout()}
    </div>

  )
}

export default Checkout