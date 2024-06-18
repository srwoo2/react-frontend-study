'use client'
import useFetchCollection from '@/hooks/useFetchCollection'
import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '@/redux/slice/productSlice'
import { Loader } from '@monorepo-library/common'
import ProductList from './productList/ProductList'
import ProductFilter from './productFilter/ProductFilter'

const Product = () => {
  const { data, isLoading } = useFetchCollection('products')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    )

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      }),
    )
  }, [data, dispatch])

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>{isLoading ? null : <ProductFilter />}</aside>
      <div className={styles.content}>{isLoading ? <Loader basic /> : <ProductList />}</div>
    </section>
  )
}

export default Product
