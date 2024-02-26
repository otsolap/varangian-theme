import React from 'react'
import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const TextField = ({ name, placeholder, showLabels, required, formRef }) => {

  const uid = createID(name)

  return (
    <>
    <label htmlFor={uid} className={showLabels ? '' : 'sr-only'}>{name}</label>
    <input
    type='text'
    name={uid}
    id={uid}
    placeholder={placeholder ? placeholder : name}
    required={required ? true : null}
    ref={formRef}
    />
    </>
  )
}

export default TextField;