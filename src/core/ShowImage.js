import React from 'react'
import {API} from '../config'

const ShowImage = ({item, url}) => (
  <div className="product-img">
    <img 
      src={`${API}/api/${url}/photo/${item._id}`} 
      alt={item.name} 
      className="mb-3" 
      style={{maxHeight: "600px", maxWidth: "300px"}}/>
  </div>
)

export default ShowImage;