import React, { ChangeEvent } from 'react'
import styles from './AutoSignInCheckbox.module.scss'
import { Checkbox } from '@monorepo-library/common'
import Tooltip from '../tooltip/Tooltip'

interface IAutoSignInCheckboxProps {
  label?: string
  checked: boolean
  disabled?: boolean
  orientation?: 'top' | 'bottom' | 'left' | 'right'
  message?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  [x: string]: any
}

const AutoSignInCheckbox = ({
  label = '자동 로그인',
  checked,
  disabled,
  orientation = 'top',
  message = '개인 정보 보호를 위해 본인 기기에서만 이용해주세요.',
  onChange,
  ...restProps
}: IAutoSignInCheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      <Checkbox label={label} checked={checked} disabled={disabled} onChange={onChange} {...restProps} />
      {checked && <Tooltip left={-5} top={24} orientation={orientation} message={message} />}
    </div>
  )
}

export default AutoSignInCheckbox
