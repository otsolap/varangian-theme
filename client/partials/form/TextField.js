import React from 'react'
import styles from '@/styles/components/form.module.css'

const TextField = ({ name, placeholder, showLabels, required, formRef }) => {
  return (
    <>
    <label htmlFor={name} className={showLabels ? '' : 'sr-only'}>{name}</label>
    <input
    type='text'
    name={name}
    id={name}
    placeholder={placeholder ? placeholder : name}
    required={required ? true : null}
    ref={formRef}
    />
    </>

  )
}

export default TextField;