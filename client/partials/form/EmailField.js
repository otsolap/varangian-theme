import React from 'react'
import styles from '@/styles/components/form.module.css'

const EmailField = ({  placeholder, showLabels, required, formRef }) => {
  return (
    <>
    <label htmlFor={'email'} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{'Email'}</label>
    <input
    type='text'
    id='email'
    name='email'
    className={styles.input}
    placeholder={placeholder ? placeholder : 'email'}
    required={required ? true : null}
    ref={formRef}
    pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
    />
    </>
  )
}

export default EmailField;