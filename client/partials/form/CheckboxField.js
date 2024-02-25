import React from 'react'
import styles from '@/styles/components/form.module.css'
import { createID } from '@/utils/index'

const CheckboxField = ({ title, options, showLabels, formRef }) => {

    const uid = createID(title)

  return (
    <>
    <fieldset>
        <legend className={showLabels ? '' : 'sr-only'}>{title}</legend>
        {options 
        ? options.map((option, index) => (
            <label key={index} htmlFor={uid + index}>
                <input type="checkbox" id={uid + index} name={title} value={option.value} ref={formRef} />
                {option.value}
            </label>
        )) : null}
    </fieldset>
    </>
  )
}

export default CheckboxField;