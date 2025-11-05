import Features from '@/components/Features'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  )
}

export default page