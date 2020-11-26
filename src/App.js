import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import ItemCard from './components/ItemCard'

const App = () => {
  const [list, setList] = useState([])
  const [itemId, setItemId] = useState(0)
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const getAllData = () => {
    axios.get('https://testing.pogo91.com/api/online-store/category/?store_prefix=cake-shop')
      .then((response) => {
        const allCategory = response.data.category
        setList(allCategory)
        setItemId(allCategory[0].id)
        getDataByCatgeoryID(allCategory[0].id, 1)
      })
      .catch(error =>
        console.error(error)
      )
  }

  const getDataByCatgeoryID = (itemId, apiPage) => {
    axios.get(`https://testing.pogo91.com/api/online-store/category/product/?store_prefix=cake-shop&page=${apiPage}&category_id=${itemId}`)
      .then((response) => {
        const allProduct = response.data.products
        setProductList(allProduct)
        setPage(response.data.num_pages)
      })
      .catch(error =>
        console.error(error)
      )
  }

  const getItems = (id) => {
    setItemId(id)
    getDataByCatgeoryID(id, 1)
    setCurrentPage(1)
  }

  useEffect(() => {
    getAllData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePage = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    getDataByCatgeoryID(itemId, newPage)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-heading'>Cake Shop</h1>
      </header>
      <div className='container'>
        <ul className='categories'>
          {list.map((item, index) => (
            <li key={index} className='categories-item' onClick={() => getItems(item.id)}>
              {item.image && <span className='categories-image'><img src={item.image} alt={item.name} /></span>}
              {item.name && <span className='categories-name'>{item.name}</span>}
            </li>
          ))}
        </ul>
        <div className='products-wrapper'>
          <ul className='product-card-wapper'>
            {productList.map((prod) => (
              <ItemCard product={prod} key={prod.product_id} />
            ))}
          </ul>
          {currentPage < page && (
            <div className='pagination'>
              <button onClick={handlePage}>next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
