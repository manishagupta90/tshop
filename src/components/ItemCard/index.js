import React, { useState, useEffect } from 'react'

const ItemCard = ({ product }) => {
  const [itemPrice, setItemPrice] = useState('')
  const [mrp, setMrp] = useState('')

  const handleChange = (event) => {
    const data = JSON.parse(event.target.value)
    setItemPrice(data.selling_price)
    setMrp(data.mrp)
  }

  useEffect(() => {
    setItemPrice(product.price_stock[0].selling_price)
    setMrp(product.price_stock[0].mrp)
  }, [product])

  return (
    <li className='product-card'>
      {product.image_url && <div className='product-image'><img src={product.image_url} alt={product.product_name} /></div>}
      {product.product_name && <div className='product-name'>{product.product_name}</div>}
      <select onChange={handleChange} className='product-weight'>
        {product.price_stock.map((weight) => (
          <option key={weight.id} value={JSON.stringify(weight)} name={weight.name}>{weight.name}</option>
        ))}
      </select>
      <div className='price'>₹{itemPrice}<span className='mrp'>₹{mrp}</span></div>
    </li>
  )
}

export default ItemCard
