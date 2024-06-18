import React from 'react'
import styles from './Loader.module.scss'
import { RotatingLines } from 'react-loader-spinner'

interface ILoaderProps {
  basic?: boolean
}

export const Loader = ({ basic }: ILoaderProps) => {
  if (basic) {
    return (
      <div className={styles.basicWrapper}>
        <RotatingLines strokeColor='grey' strokeWidth='5' animationDuration='0.75' width='30' visible={true} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <RotatingLines strokeColor='grey' strokeWidth='5' animationDuration='0.75' width='30' visible={true} />
      </div>
    </div>
  )
}
