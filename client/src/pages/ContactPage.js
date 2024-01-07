import React from 'react'
import { ContactForm } from '../components'
import styled from 'styled-components'
import { FaPhone } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function ContactPage() {
  return (
    <ContactPageContainer className='page page-content page-center'>
      <article className='form'>
        <h3>questions, comments or concerns?</h3>
        <div className='phone-number'>
          <MdEmail />
          <a href='mailto:info@munuvitta.com'>
            <p>info@mynuvitta.com</p>
          </a>
        </div>
        <div className='phone-number'>
          <FaPhone />
          <p>425-635-8929</p>
        </div>
        <h4>Get in touch using form below</h4>
        <ContactForm />
      </article>
    </ContactPageContainer>
  )
}

const ContactPageContainer = styled.section`
  h3 {
    font-size: 26px;
    letter-spacing: 2px;
    font-weight: 800;
  }
  .form {
    text-align: center;
    h3,
    h4 {
      margin: 2rem 0rem;
      color: var(--heading-color);
    }
  }
  .phone-number {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    p,
    svg {
      font-size: 20px;
    }
    svg {
      color: var(--heading-color);
    }
    a {
      color: var(--brand-color);
    }
  }
`
