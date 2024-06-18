'use client'
import React from 'react'
import styles from './ProductItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat'
import { Rating } from 'react-simple-star-rating'
import rocketBadgeIcon from '@/assets/badge-rocket.svg'
import useFetchDocuments from '@/hooks/useFetchDocuments'

interface IProductItemProps {
  id: string
  name: string
  price: number
  imageURL: string
  category: string
  brand: string
}

const ProductItem = ({ id, name, price, imageURL, category, brand }: IProductItemProps) => {
  // const { documents } = useFetchDocuments('reviews', ["productID", "==", id])

  // let productRating = 0;

  // documents.map(doc => {
  //   productRating = productRating + doc.rate;
  // })

  // const rating = productRating / documents.length;

  const shortenText = (text: string, n: number) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...')
      return shortenedText
    }
    return text
  }

  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          {/* TODO:: 성인인증 되어있지 않을 시, 19세 이미지 overlay 필요하다. JIRA-TICKET-2001 */}
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong style={{ color: '#cb1400' }}>{priceFormat(price)}</strong>원{' '}
            <Image src={rocketBadgeIcon} alt='로켓배송' />
          </em>
          <div className={styles.rating}>
            <Rating
              size={17}
              readonly
              initialValue={1}
              // initialValue={Number.isNaN(rating) ? 0 : rating}
            />
            <span className={styles.ratingCount}>
              (1)
              {/* ({documents.length}) */}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
