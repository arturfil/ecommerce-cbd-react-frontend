import { API } from '../config'

export const getProducts = sortBy => {
  return fetch(
    `${API}/api/product/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
      method: 'GET'
    }
  )
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const getCategories = () => {
  return fetch(`${API}/api/category/categories`, {
    methdo: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
}

export const getFilteredProducts = (skip, limit, filters = {} ) => {
  const data = {
    limit, skip, filters
  }
  return fetch(`${API}/api/product/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type":"application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
}