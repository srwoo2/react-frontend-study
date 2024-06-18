import { FILTER_BY } from '@/redux/slice/filterSlice'
import { selectMaxPrice, selectMinPrice, selectProducts } from '@/redux/slice/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductFilter.module.scss'
import priceFormat from '@/utils/priceFormat'
import { Button } from '@monorepo-library/common'

const ProductFilter = () => {
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [price, setPrice] = useState(10000)

  const products = useSelector(selectProducts)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  const dispatch = useDispatch()

  const allCategories = ['All', ...new Set(products.map((product) => product.category))]

  const filterCategories = (category: string) => {
    setCategory(category)
  }

  const allBrands = ['All', ...new Set(products.map((product) => product.brand))]

  useEffect(() => {
    dispatch(FILTER_BY({ products, price, category, brand }))
  }, [dispatch, products, price, category, brand])

  const clearFilters = () => {
    setCategory('All')
    setBrand('All')
    setPrice(maxPrice)
  }

  return (
    <div className={styles.filter}>
      <h4>카테고리</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={cat}
              type='button'
              className={`${category}` === cat ? `${styles.active}` : ''}
              onClick={() => filterCategories(cat)}
            >
              &#8250; {cat}
            </button>
          )
        })}
      </div>

      <h4>브랜드</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand) => {
            return (
              <option value={brand} key={brand}>
                {brand}
              </option>
            )
          })}
        </select>
      </div>

      <h4>가격</h4>
      <p>{priceFormat(Number(price))}원</p>
      <div className={styles.price}>
        <input
          type='range'
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          min={minPrice}
          max={maxPrice}
        />
      </div>

      <br />
      <Button onClick={clearFilters}>필터 초기화</Button>
    </div>
  )
}

export default ProductFilter
