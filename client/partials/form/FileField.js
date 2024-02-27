import React from 'react'
import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const FileField = ({ name, description, showLabels, required, formRef }) => {

  const uid = createID(name)

  return (
    <>
    <label htmlFor={uid} className={showLabels ? '' : 'sr-only'}>{description}</label>
    <input
    type='file'
    id={uid}
    name={uid}
    required={required ? true : null}
    ref={formRef}
    accept=".jpg, .jpeg, .png, .webp, .pdf"
    />
    </>
  )
}

export default FileField;