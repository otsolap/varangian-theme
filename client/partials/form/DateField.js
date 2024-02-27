import React from 'react'
import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const DateField = ({ title, showLabels, required, formRef }) => {

  const uid = createID(title)

  return (
    <>
    <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{title}</label>
    <input
    type='date'
    id={uid}
    name={uid}
    required={required ? true : null}
    ref={formRef}
    className={styles.input}
    />
    </>

  )
}

export default DateField;