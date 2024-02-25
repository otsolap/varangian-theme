import React from 'react'
import styles from '@/styles/components/form.module.css'

const SelectField = ({ title, placeholder, options, showLabels, formRef }) => {

    const createID = (title) => {
        return title.replace(/\s+/g, '-').toLowerCase();
    }

    const uid = createID(title)

  return (
    <>
    <label htmlFor={uid} className={showLabels ? '' : 'sr-only'}>{title}</label>
    <select id={uid} name={title} ref={formRef}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options 
        ? options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.value}
            </option>
        )) : null}
    </select>
    </>

  )
}

export default SelectField;