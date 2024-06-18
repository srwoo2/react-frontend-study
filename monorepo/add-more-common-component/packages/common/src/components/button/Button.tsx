import classNames from 'classnames'
import styles from './Button.module.scss'

interface IButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined
  secondary?: boolean
  bgColor?: string
  fgColor?: string
  width?: string
  [x: string]: any
}

export const Button = ({ type = 'button', secondary = false, bgColor, fgColor, width, ...restProps }: IButtonProps) => {
  const composeClasses = classNames(styles.button, secondary ? styles.secondary : styles.primary)

  const style = {
    backgroundColor: bgColor || '',
    color: fgColor || '',
    width: width || '',
  }

  return <button className={composeClasses} type={type} style={style} {...restProps} />
}
