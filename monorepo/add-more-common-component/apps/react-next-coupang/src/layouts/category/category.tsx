import { useCategory } from './useCategory'
import styles from './category.module.scss'
import { ICategoryMenu } from './category.model'
import { ReactNode, useEffect, useRef } from 'react'

interface CategoryProps {}

export const Category: React.FC<CategoryProps> = () => {
  const { category } = useCategory()
  const ref = useRef<HTMLUListElement>(null)

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryWrapper}>
        <ul className={styles.firstCategory} ref={ref}>
          {category.menus.map((it, idx) => {
            const height = ref.current?.scrollHeight

            return <CategoryMenu isFirst={true} height={height || 0} {...it} key={idx} />
          })}
        </ul>
      </div>
    </div>
  )
}

interface CategoryMenuProps extends ICategoryMenu {
  isFirst: boolean
  height: number
}

const CategoryMenu: React.FC<CategoryMenuProps> = (props) => {
  const { isFirst, name, depth, url, height } = props

  return (
    <>
      <li
        className={isFirst ? styles.firstCategoryMenu : styles.nthCategoryMenu}
        style={{ cursor: url ? 'pointer' : 'default' }}
      >
        {url ? <a href={url}>{name}</a> : <span>{name}</span>}
        {depth && (
          <div className={styles.nthCategoryWrapper} style={{ height: height }}>
            <ul className={styles.nthCategory}>
              {depth?.menus?.map((it, idx) => {
                return <CategoryMenu isFirst={false} {...it} height={height} key={idx} />
              })}
            </ul>
          </div>
        )}
        {isFirst && <div className={styles.backPanel} style={{ height: height }}></div>}
      </li>
    </>
  )
}
