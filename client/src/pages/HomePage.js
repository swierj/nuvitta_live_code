import React from 'react'
import {
  BackgroundImg,
  Banner,
  BundleProducts,
  Services,
  BundleImg,
} from '../components'

export default function HomePage() {
  return (
    <main>
      <Banner />
      <BackgroundImg />
      <BundleProducts />
      <BackgroundImg />
      <Services />
    </main>
  )
}
