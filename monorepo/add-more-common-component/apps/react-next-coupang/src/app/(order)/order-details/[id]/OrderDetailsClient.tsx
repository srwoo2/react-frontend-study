'use client'
import React from 'react'
import styles from './OrderDetails.module.scss'
import { useParams, useRouter } from 'next/navigation'
import useFetchDocument from '@/hooks/useFetchDocument'
import { Heading, Loader, Button } from '@monorepo-library/common'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat'
import { ICartItem } from '@/types'

const OrderDetailsClient = () => {
  const { id } = useParams()

  const { document: order } = useFetchDocument('orders', id)

  const router = useRouter()
  const handleClick = (id: string) => {
    router.push(`/review-product/${id}`)
  }

  return (
    <section className={styles.table}>
      <Heading title='주문 상세 정보' />
      {order === null ? (
        <Loader />
      ) : (
        <>
          <div className={styles.details}>
            <p>
              <b>주문 아이디</b> {order.id}
            </p>
            <p>
              <b>주문 가격</b> {order.orderAmount} 원
            </p>
            <p>
              <b>주문 상태</b> {order.orderStatus}
            </p>
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>상품</th>
                  <th>가격</th>
                  <th>개수</th>
                  <th>합계</th>
                  <th>실행</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cartItem: ICartItem, index: number) => {
                  const { id, name, price, imageURL, cartQuantity } = cartItem
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <Image src={imageURL} alt={name} width={100} height={100} />
                      </td>
                      <td>{priceFormat(price)}원</td>
                      <td>{cartQuantity}</td>
                      <td>{priceFormat(price * cartQuantity)}원</td>
                      <td className={styles.icons}>
                        <Button onClick={() => handleClick(id)}>상품 리뷰하기</Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

export default OrderDetailsClient
