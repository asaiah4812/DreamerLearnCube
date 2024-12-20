"use client"
import React from 'react'
import { Button } from './button'
import { useRouter } from 'next/navigation'

const steps = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Connect your Web3 wallet to get started with creating or joining quiz rooms."
  },
  {
    step: "02",
    title: "Create or Join",
    description: "Create your own quiz room with custom questions or join existing rooms with a room ID."
  },
  {
    step: "03",
    title: "Learn & Earn",
    description: "Participate in quizzes, earn points, and track your progress on the blockchain."
  }
]

const HowWeWork = () => {
  const router = useRouter()

  return (
    <>
      <section className='py-20 bg-black/20 backdrop-blur-sm'>
        <div className='w-[95%] md:w-[90%] lg:w-[70%] mx-auto'>
          <h2 className='text-4xl font-bold text-white text-center mb-12'>
            How It Works
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {steps.map((step, index) => (
              <div key={index} className='relative'>
                <div className='text-6xl font-bold text-white/10 absolute -top-8 -left-4'>
                  {step.step}
                </div>
                <div className='relative z-10'>
                  <h3 className='text-xl font-semibold text-white mb-2'>{step.title}</h3>
                  <p className='text-gray-300'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 w-[95%] md:w-[90%] lg:w-[70%] mx-auto text-center'>
        <h2 className='text-4xl font-bold text-white mb-6'>
          Ready to Get Started?
        </h2>
        <p className='text-gray-300 mb-8 max-w-2xl mx-auto'>
          Join our community of learners and educators leveraging Web3 technology for interactive education.
        </p>
        <div className="flex gap-4 items-center justify-center">
          <Button
            onClick={() => router.push('/create')}
            className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
          >
            Create Room
          </Button>
          <Button
            onClick={() => router.push('/join')}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/5"
          >
            Join Room
          </Button>
        </div>
      </section>
    </>
  )
}

export default HowWeWork
