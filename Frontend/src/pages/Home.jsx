import React from 'react'
import Hero from '../component/Hero'
import Steps from '../component/Steps'
import Description from '../component/Description'
import Testimonial from '../component/Testimonial'
import GenerateButton from '../component/GenerateButton'

const Home = () => {
  return (
    <div>
      <Hero />
      <Steps />
      <Description />
      <Testimonial />
      <GenerateButton/>
    </div>
  )
}

export default Home
