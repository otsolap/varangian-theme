import React, { useRef } from 'react'
import axios from 'axios'
import Inputs from '@/components/Inputs'
import styles from '@/styles/components/form.module.css'
import config from '@/utils/config'
import { getStrapiURL } from "utils"


const FormEmbed = ({ form }) => {
  const formRef = useRef(null)

  if (!form || !form.data) {
    return null;
}

  const { formID, title, description, showLabels, inputs, image, button } = form.data.attributes;
  const token = process.env.NEXT_PUBLIC_API_TOKEN

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {}

    if(e.target.honeypot.value !== "") {
      // Form submission was likely by a bot
      return
    }

    inputs.forEach((input) => {
      if (formRef.current[input.name]) {
        formData[input.name] = formRef.current[input.name].value
      }
    })
  
    const formattedDataString = Object.entries(formData)
      .map(([key, value]) => `label: ${key}\nvalue: ${value}\n`)
      .join('')
      
    const headers = {
      Authorization: `Bearer ${token}`
     }

    const data = {
      data: {
        form: form.data.id,
        details: formattedDataString
      }
    }

    console.log(data)
    console.log(headers)
    console.log(getStrapiURL(`/${config.forms.COLLECTIONS_PATH}`))

    axios.post(getStrapiURL(`/${config.forms.COLLECTIONS_PATH}`), data, { headers })
      .then((response) => {
       // Handle successful response
       console.log(response.data)
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message || 'Unknown error. Blame your internet.'
        console.log(errorMessage)
      })
      .finally(() => {
        // Any final cleanup or logic after the request
      })
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </header>
      {inputs.length && button ? (
        <form 
          id={formID ? formID : null}
          className={styles.form} 
          ref={formRef} 
          onSubmit={handleSubmit}
          >
          <div className={styles.inputWrapper}>
            <input type="hidden" value="" name="honeypot" />
            <Inputs 
              inputs={inputs} 
              showLabels={showLabels}
              formRef={formRef} 
            />
          </div>
            <button type="submit" value="submit" className={`button button--${button.selectTheme}`} >
              {button.title}
            </button>
        </form>
      ) : null}
    </section>
  )
}

export default FormEmbed