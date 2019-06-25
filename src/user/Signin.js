import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate } from '../auth/index';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'filioarturo@gmail.com',
    password: 'password',
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  const {email, password, loading, error, redirectToReferrer } = values

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(
            data, () => {
              setValues({
                ...values,
                redirectToReferrer: true
              })
            }
          )
        }
      })
  }

  const signInForm = () => (
    <form action="">
      <div className="form-group">
        <label htmlFor="" className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email} />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password} />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Sign In
      </button>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  )

  const redirectUser = () => {
    if(redirectToReferrer) {
      return <Redirect to="/" />
    }
  }

  return (
    <Layout
      className="container col-md-8 offset-md-2"
      title="Sign In Page"
      description="The Hemp Reserve"
      children={process.env.REACT_APP_API_URL} >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}

    </Layout>

  )
}

export default Signin;