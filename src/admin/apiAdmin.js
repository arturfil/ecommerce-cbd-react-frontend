import { API } from '../config'

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/api/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/api/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCategories = () => {
  return fetch(`${API}/api/category/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const listOrders = (userId, token) => {
  return fetch(`${API}/api/orders/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {console.log(err)});
}

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/api/orders/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => { console.log(err) });
}

export const updateOrderStatus = (userId,token,orderId, status) => {
  return fetch(`${API}/api/orders/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type":'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({status, orderId})
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
}

/**
 * CRUD METHOD for produts
 * - Get all products
 * - get single products
 * - create product
 * - update single product
 * - delete single product
 */

export const getProducts = (token) => {
  return fetch(`${API}/api/product/products?limit=undefined`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => { 
      console.log(err) 
    });
}

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/api/product/products/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
}

export const getProduct = (productId, token) => {
  return fetch(`${API}/api/product/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    });
}

export const updateProduct = (productId, userId, token, product) => { 
  return fetch(`${API}/api/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
}