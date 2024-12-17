"use client"
import React from 'react'
import Luke from './Luke/luke'
import NiceButton from './NiceButton'
import GhostButton from './GhostButton'
import { CheckCircle2 } from 'lucide-react'

const features = [
  "Create interactive quizzes with Web3 integration",
  "Real-time participation and scoring",
  "Secure blockchain-based verification",
  "Customizable question formats"
]

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className='flex flex-col space-y-5 md:flex-row w-[95%] md:w-[90%] lg:w-[70%] mx-auto h-fit md:h-[75vh] backdrop-blur-sm items-center'>
        <div className='space-y-6 flex flex-col'>
          <h1 className='text-white lg:text-6xl font-bold'>
            Unlock the power of <br />
            <span className='bg-gradient-to-tr from-green-600 via-orange-600 to-purple-600 text-transparent bg-clip-text'>Web3</span> Development <br />
            Decentralized learning.
          </h1>
          <p className='text-white md:w-[80%]'>
            Get ready to level up your knowledge! Our platform combines blockchain technology with interactive learning.
          </p>
          <ul className='space-y-2'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-center gap-2 text-sm font-light text-white'>
                <CheckCircle2 className='text-green-500' size={20} />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 items-center">
            <GhostButton text='Create Room' link='/create' />
            <NiceButton text='Join Room' buttonUrl='/join'/>
          </div>
        </div>
        <Luke/>
      </div>
    </>
  )
}

export default Hero
