import React from 'react'
import styles from './Heading.module.scss'

interface IHeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

export const Heading = ({ title, subtitle, center }: IHeadingProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={center ? styles.center : ''}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  )
}
