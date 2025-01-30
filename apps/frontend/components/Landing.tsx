import React from 'react'
import { Hero } from './Hero'
import { IntegrationCard } from './Integrations'
import CarouselComponent from './carousel'

const Landing = () => {
  return (
    <>
      <Hero />
      <IntegrationCard />
      <CarouselComponent />
    </>
  )
}

export default Landing
