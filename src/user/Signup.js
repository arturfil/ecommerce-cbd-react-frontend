import React from 'react';
import Layout from '../core/Layout';
import {API} from '../config';

const SignUp = () => {
  const signUpForm = () => (
    <form action="">
      <div className="form-group">
        <label htmlFor="" className="text-muted">Name</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">Password</label>
        <input type="password" className="form-control" />
      </div>
      <button className="btn btn-primary">
        Sign Up
      </button>
    </form>
  )

  return (
    <Layout 
      className="container col-md-8 offset-md-2" 
      title="SignUp Page" 
      description="The Hemp Reserve" 
      children={process.env.REACT_APP_API_URL} >

      {signUpForm()}
      
    </Layout>

  )
}

export default SignUp;