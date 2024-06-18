'use client'
import useFetchDocument from '@/hooks/useFetchDocument'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import styles from './ProductDetails.module.scss'
import { Loader, Divider } from '@monorepo-library/common'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import priceFormat from '@/utils/priceFormat'
import listCashIcon from '@/assets/list-cash-icon.png'
import { Button } from '@monorepo-library/common'
import useFetchDocuments from '@/hooks/useFetchDocuments'
import ProductReviewItem from '@/components/product/productReviewItem/ProductReviewItem'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '@/redux/slice/cartSlice'

const ProductDetailsClient = () => {
  const { id } = useParams()

  const { document: product } = useFetchDocument('products', id)

  const { documents: reviews } = useFetchDocuments('reviews', ['productID', '==', id])

  const dispatch = useDispatch()
  const [count, setCount] = useState(1)

  //add to cart
  const addToCart = () => {
    dispatch(ADD_TO_CART({ ...product, quantity: count }))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const today = new Date()
  const tomorrow = new Date(today.setDate(today.getDate() + 1))

  const tomorrowDate = tomorrow.getDate()
  const tomorrowMonth = tomorrow.getMonth()

  return (
    <section className={styles.product}>
      {product === null ? (
        <Loader />
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              {/* TODO:: 성인인증 되어있지 않을 시, 19세 이미지 overlay 필요하다. JIRA-TICKET-2001 */}
              {/*
                                    한 번에 적용하는 세 가지 방법
                                    1. product.imageURL = 서버에서 연산할때 성인인증인지 유무를 체크해서 19세 이미지를 아에 처음부터 넣어버리는 것. (서버사이드)
                                    2. Thumbnail Image Component를 만들어서, 성인인증 체크를 하고 (QueryClient) 레이아웃을 19세로 교체하는 것. (클라이언트사이드)
                                    3. Redux, 중앙 상태에서 성인인증 유무를 체크하여 데이터를 한번에 내려주면 모두 해결.
                                */}
              <Image width={477} height={410} src={product.imageURL} alt={product.name} priority />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <p className={styles.brandName}>{product.brand}</p>
                <p className={styles.productName}>{product.name}</p>
                <div className={styles.rating}>
                  <Rating initialValue={3} size={17} />
                  <span className={styles.count}>10,000개 상품평</span>
                </div>
              </div>

              <Divider space={0} />

              <div className={styles.shippingWrapper}>
                <p className={styles.textBold}>무료배송</p>
                <p className={styles.shippingDateText}>
                  내일 {tomorrowMonth}/{tomorrowDate}
                  <span>도착 보장</span>
                </p>
              </div>

              <Divider space={0} />

              <div className={styles.container}>
                <p className={styles.price}>{priceFormat(product.price)}원</p>

                <div className={styles.rewardCashBadge}>
                  <Image src={listCashIcon} alt='cash-icon' width={12} />
                  <span>최대 {product.price / 10}원 적립</span>
                </div>
              </div>

              <Divider space={0} />

              <div className={styles.rewardCashWrapper}>
                <div className={styles.rewardSummary}>
                  <Image src={listCashIcon} alt='cash-icon' width={15} />
                  <p>
                    캐시적립 혜택<span>|</span> 최대 <strong>{product.price / 10}</strong>원 적립
                  </p>
                </div>

                <div className={styles.rewardCashPromotion}>
                  <p> 쿠페이 머니 결제 시 1% 적립</p>
                  <p>[로켓와우 + 쿠페이 계좌이체] 결제 시 2% 적립</p>
                  <p>[로켓와우 + 쿠페이 머니] 결제 시 4% 추가적립</p>
                  <button>로켓와우 무료체험 신청하기</button>
                </div>
              </div>

              <Divider space={0} />

              <div className={styles.bottom}>
                <p className={styles.price}>{product.price * count}원</p>

                <div className={styles.count}>
                  <Button onClick={() => setCount((prev) => prev - 1)} disabled={count > 1 ? false : true} secondary>
                    -
                  </Button>
                  <p>
                    <b>{count}</b>
                  </p>
                  <Button secondary onClick={() => setCount((prev) => prev + 1)}>
                    +
                  </Button>

                  <Button onClick={() => addToCart()}>장바구니 담기</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.card}>
        <h3>상품평 ({reviews.length})</h3>
        <div>
          {reviews.length === 0 ? (
            <p className={styles.noReviewText}>해당 상품에 대한 상품평이 아직 없습니다.</p>
          ) : (
            <>
              {reviews.map((item) => {
                return (
                  <ProductReviewItem
                    key={item.id}
                    rate={item.rate}
                    review={item.review}
                    reviewDate={item.reviewDate}
                    userName={item.userName}
                  />
                )
              })}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsClient
