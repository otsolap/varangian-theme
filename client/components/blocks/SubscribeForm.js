import React, { useRef } from 'react'
import axios from 'axios'
import styles from '@/styles/components/form.module.css'
import config from '@/utils/config'
import { getStrapiURL } from "utils"
import EmailField from 'partials/form/EmailField';


const FormEmbed = ({ title, description, email, formID }) => {
  const formRef = useRef(null)

  if (!formID) {
    return null
  }

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

    const headers = {
      Authorization: `Bearer ${token}`
     }

    const data = {
      data: {
        subscribeFormId: formID,
        email: formData['email'],
      }
    }

    console.log(data)

    axios.post(getStrapiURL(`/${config.forms.SUBSCRIPTION_PATH}`), data, { headers })
      .then((response) => {
       // Handle successful response
       console.log(response.data)
       console.log('we did it reddit!')
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
        {formID ? (
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
              <div className={`${styles.inputWrapper} ${styles.row}`}>
                    <input type="hidden" value="" name="honeypot" />
                    <EmailField 
                        formRef={formRef} 
                        placeholder={email.placeholder}
                        required={email.required}
                    />
                <footer className={`${styles.footer} ${styles.paddingZero}`}>
                    <button type="submit" value="submit" className={`button button--primary`} >
                    Subscribe
                    </button>
                </footer>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default FormEmbed