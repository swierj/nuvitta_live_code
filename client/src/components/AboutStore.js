import React from 'react'
import styled from 'styled-components'
import products_img from '../assets/products_about.jpg'
import ela_about from '../assets/Ela_About_1.jpg'

export default function AboutStore() {
  return (
    <AboutContainer className='page'>
      <section className='product-description page-center'>
        <article>
          {/* <img src={map} className='redmond' alt='products about page' /> */}
          <h1>our products...</h1>
          <p>
            Begin their journey in our facility in Redmond, Washington, where
            they are carefully hand poured and packaged. We make it our priority
            to produce organic and vegan NuVitta products that are also free of
            harmful parabens and unnecessary toxic chemicals commonly found in
            skincare products, such as petrochemicals and phthalates.
          </p>
          <p>
            We pride ourselves in sourcing the highest quality ingredients,
            worthy of your skin. Our products come infused with various natural
            scents and oils to help rejuvenate your skin and give it the amazing
            scents of our key ingredients. Each product is designed for certain
            types of skins and skin routines, with all information on proper
            application, benefits, ingredients, etc. found on our product page
            and your product label!
          </p>
        </article>
        <img src={products_img} alt='products about page' />
      </section>

      <section className='about-founder page-center'>
        <img src={ela_about} alt='image of ela with products' />
        <article>
          <h1>about the founder</h1>
          <p>
            Ela started her skin care business, “NuFace Skincare” in 2008 in
            Redmond, shortly after moving to the United States from Poland where
            she had received a Master of Science at Lodz University and gone on
            to start multiple businesses, always having a passion for skincare
            and working with patients to a achieve healthy and rejuvenated skin.
          </p>
          <p>
            Since moving to the United States, Ela has gained many
            certifications and licenses for various treatments. She has worked
            extensively on obtaining permanent makeup and brow certifications in
            addition to being licensed for skin care treatments such as facials
            and hydrafacials. All of this, in addition to 15 years of experience
            and thousands of procedures and satisfied clients, has made Ela an
            expert in her field.
          </p>
          <p>
            After noticing patterns of her client's skin irritations due to
            chemicals frequently found in mainstream skin care products, Ela
            created her own skin care product brand in 2019 with a desire to use
            the highest quality ingredients and make her products friendly to
            all skin types, including sensitive ones. Ever since, Ela has
            applied her products in her treatments and both her and her patients
            have seen amazing results.
          </p>
        </article>
      </section>
    </AboutContainer>
  )
}

const AboutContainer = styled.section`
  margin-top: 2rem;
  .product-description {
    display: grid;
    gap: 3rem;
    margin-bottom: 4rem;
    img {
      width: 100%;
      display: block;
      border-radius: 1.5rem;
    }
  }
  .about-founder {
    display: grid;
    gap: 3rem;
    margin-bottom: 4rem;
    img {
      width: 100%;
      display: block;
      border-radius: 0.75rem;
    }
  }
  h1 {
    margin-top: 4rem;
    text-align: center;
    font-size: 30px;
  }
  p {
    margin-top: 1.5rem;
  }
  @media (max-width: 1023px) {
    img {
      margin: auto;
      max-width: 30rem;
    }
  }
  @media (min-width: 1024px) {
    .product-description {
      grid-template-columns: 1.4fr 1fr;
    }
    .about-founder {
      grid-template-columns: 1fr 1.4fr;
    }
  }
`
