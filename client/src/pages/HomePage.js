import React from 'react'
import {
  BackgroundImg,
  Banner,
  BestsellerProducts,
  BundleProducts,
  Services,
} from '../components'

export default function HomePage() {
  return (
    <main>
      <Banner />
      <BackgroundImg />
      <BundleProducts />
      <BackgroundImg />
      <BestsellerProducts />
      <Services />
    </main>
  )
}
