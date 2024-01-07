import Reac, { useState } from 'react'
import styled from 'styled-components'

const FORM_ENDPOINT =
  'https://public.herotofu.com/v1/08450440-ac86-11ee-ae0b-a7e011fe96d3'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()

    const inputs = e.target.elements
    const data = {}

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value
      }
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Form response was not ok')
        }

        setSubmitted(true)
      })
      .catch((err) => {
        // Submit the form manually
        e.target.submit()
      })
  }

  if (submitted) {
    return (
      <>
        <h2>Thank you!</h2>
        <div>We'll be in touch soon.</div>
      </>
    )
  }
  return (
    <ContactFormContainer>
      <form action={FORM_ENDPOINT} onSubmit={handleSubmit} method='POST'>
        <div className='input-box'>
          <input type='text' placeholder='Name' name='name' required />
        </div>
        <div className='input-box'>
          <input type='email' placeholder='Email' name='email' required />
        </div>
        <div className='input-box'>
          <textarea placeholder='Your message' name='message' required />
        </div>
        <div>
          <button type='submit' className='btn'>
            <p>send message</p>
          </button>
        </div>
      </form>
    </ContactFormContainer>
  )
}
const ContactFormContainer = styled.section`
  input {
    min-width: 30%;
    margin-bottom: 2rem;
    padding: 6px;
    border-radius: 6px;
    border: 3px solid gray;
    :focus {
      outline: none !important;
      border-color: var(--brand-color);
      box-shadow: 0 0 6px var(--brand-color);
    }
  }
  textarea {
    min-width: 30%;
    height: 200px;
    padding: 6px;
    border-radius: 6px;
    border: 3px solid gray;
    :focus {
      outline: none !important;
      border-color: var(--brand-color);
      box-shadow: 0 0 6px var(--brand-color);
    }
  }
  .input-box {
  }
  .btn {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    p {
      font-weight: 800;
      font-size: 14px;
    }
  }
`
