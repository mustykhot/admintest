import React from 'react'
import {Button as AntButton, ButtonProps} from 'antd'
import './Button.scss'
import { omit } from 'lodash'

const ButtonIcon = (props:ButtonProps) => {
    const {name,className,icon} = props
  return (
    <AntButton {...omit(props,'icon')} className={`yaraa-btn ${className}`}>{name}{icon}</AntButton>
  )
}

export default ButtonIcon