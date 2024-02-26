import React from 'react'
import styles from '@/styles/components/form.module.css'


const TextAreaField = ({ name, placeholder, showLabels, formRef }) => {
  return (
    <>
    <label htmlFor={name} className={showLabels ? '' : 'sr-only'}>{name}</label>
    <textarea 
      id={name} 
      name={name} 
      placeholder={placeholder ? placeholder : name} 
      ref={formRef}
      >
    </textarea>
    </>

  )
}

export default  TextAreaField;