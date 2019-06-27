import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom';
import {createProduct} from './apiAdmin';

const AddProduct = () => { 
  const {user, token} = isAuthenticated()
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories:[],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  useEffect(() => {
    setValues({...values, formData: new FormData()})
  }, [])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0]: event.target.value
    formData.set(name, value)
    setValues({...values, [name]: value})
  }

  const clickSubmit = (event) => {
    
  }

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <input onChange={handleChange('description')} type="text" className="form-control" value={description} />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input onChange={handleChange('price')} type="text" className="form-control" value={price} />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange('category')} type="text" className="form-control">
          <option value="5d0f4dfbadad6a9cdf9a6d45">tablets</option>
          <option value="5d0f4dedadad6a9cdf9a6d44">drops</option>
          <option value="5d0fcd35252217a04b1bd923">chocolate</option>
        </select> 
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input onChange={handleChange('quantitiy')} type="number" className="form-control" value={quantity} />
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange('shipping')} type="text" className="form-control">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )

  return (
    <Layout
      title="Add a new Product"
      description={`Hello ${user.name}, add a new product`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {newPostForm()}
        </div>
      </div>
    </Layout>
  )
}

export default AddProduct
