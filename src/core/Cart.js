import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart, removeItem } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getCart())
  }, [items])

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            dislayAddToCartButton={false}
            cartUpdate={true}
            displayRemoveProductButton={true}
          />
        ))}
      </div>
    );
  }

  const noItemsMessage = () => (
    <div style={{textAlign: 'center'}}>
      <h2>Your Cart is Empty <br/> <Link to="/">Click HERE to Continue Shopping!</Link></h2>
    </div>
  )

  return (
    <Layout title='Your Shopping Cart' description='The Hemp Reserve' className="container-fluid">
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr/>
          <Checkout products={items} /> 
        </div>
      </div>
    </Layout>
  )
}

export default Cart