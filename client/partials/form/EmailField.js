import React from 'react'
import styles from '@/styles/components/form.module.css'

const EmailField = ({  placeholder, showLabels, formRef }) => {
  return (
    <>
    <label htmlFor={'email'} className={showLabels ? '' : 'sr-only'}>{'Email'}</label>
    <input
    type='email'
    id={'email'}
    placeholder={placeholder ? placeholder : 'email'}
    ref={formRef}
    />
    </>

  )
}

export default EmailField;