"use client"
import React from 'react'
import Luke from './Luke/luke'
import { Button } from './button'
import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const features = [
  "Create interactive quizzes with Web3 integration",
  "Real-time participation and scoring",
  "Secure blockchain-based verification",
  "Customizable question formats"
]

const Hero = () => {
  const router = useRouter()
  
  return (
    <>
      {/* Hero Section */}
      <div className='flex flex-col space-y-5 md:flex-row w-[95%] md:w-[90%] lg:w-[70%] mx-auto h-fit md:h-[75vh] backdrop-blur-sm items-center'>
        <div className='space-y-6 flex flex-col'>
          <h1 className='text-white text-3xl md:text-5xl lg:text-6xl font-bold'>
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
          <div className="flex items-center gap-4 mt-8">
            <Button
              onClick={() => router.push('/join')}
              className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
            >
              Join Room
            </Button>
            <Button
              onClick={() => router.push('/create')}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/5"
            >
              Create Room
            </Button>
          </div>
        </div>
        <Luke/>
      </div>
    </>
  )
}

export default Hero
