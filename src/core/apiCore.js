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