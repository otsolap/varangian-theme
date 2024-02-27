import React from 'react'
import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const SelectField = ({ title, placeholder, options, required, showLabels, formRef }) => {

  const uid = createID(title)

  return (
    <>
    <label htmlFor={uid} className={`${styles.label} ${showLabels ? '' : 'sr-only'}`}>{title}</label>
    <select id={uid} name={uid} ref={formRef} required={required ? true : null} >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options 
        ? options.map((option, index) => (
            <option key={index} value={option.value} >
                {option.value}
            </option>
        )) : null}
    </select>
    </>

  )
}

export default SelectField;