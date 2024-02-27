import React, { useRef } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import Inputs from '@/components/Inputs'
import styles from '@/styles/components/form.module.css'
import config from '@/utils/config'
import { getStrapiURL } from "utils"
import NextImage from "@/partials/util/NextImage";


const FormEmbed = ({ form }) => {
  const formRef = useRef(null)
  const router = useRouter()

  if (!form || !form.data) {
    return null
  }

  const { formID, title, description, showLabels, inputs, image, button } = form.data.attributes
  const token = process.env.NEXT_PUBLIC_API_TOKEN

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {}

    if(e.target.honeypot.value !== "") {
      // Form submission was likely by a bot
      return
    }

    formRef.current.querySelectorAll('input').forEach(input => {
      const name = input.name
      const value = input.value 

      if(name !== 'honeypot')  { 
          formData[name] = value
        }
    })
      
    const formattedDataString = Object.entries(formData)
    .map(([key, value]) => `<br><strong>label:</strong> ${key}<br>value: ${value}<br>`)
    .join('')

      
    const headers = {
      Authorization: `Bearer ${token}`
     }

    const data = {
      data: {
        form: form.data.id,
        detailsJSON: formData,
        details: formattedDataString,
      }
    }

    axios.post(getStrapiURL(`/${config.forms.COLLECTIONS_PATH}`), data, { headers })
      .then((response) => {
       // Handle successful response
       console.log(response.data)
       router.push(button.href)
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

      <div className={styles.wrapper}>
        {inputs.length && button ? (
          <div className={styles.content}>
            <form 
              id={formID ? formID : null}
              className={styles.form} 
              ref={formRef} 
              onSubmit={handleSubmit}
              >
            <header className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {description && <p>{description}</p>}
             </header>
              <div className={styles.inputWrapper}>
                <input type="hidden" value="" name="honeypot" />
                <Inputs 
                  inputs={inputs} 
                  showLabels={showLabels}
                  formRef={formRef} 
                />
              </div>
              <footer className={styles.footer}>
                <button type="submit" value="submit" className={`button button--${button.selectTheme}`} >
                  {button.title}
                </button>
              </footer>
            </form>
          </div>
        ) : null}
        {image && (
          <figure className={styles.imageContainer}>
              <NextImage className={styles.image} image={image} />
          </figure>
        )}
      </div>
    </section>
  )
}

export default FormEmbed