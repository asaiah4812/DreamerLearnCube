import React from 'react'

let fews = [
    {
      title: "Web3 Integration",
      description: "Seamlessly connect with blockchain technology for secure and transparent quiz management.",
      icon: "🌐"
    },
    {
      title: "Real-time Interaction",
      description: "Engage participants with live quizzes and instant feedback for an immersive experience.",
      icon: "⚡"
    },
    {
      title: "Secure Verification",
      description: "Leverage blockchain technology to ensure the integrity of quiz results and participation.",
      icon: "🔒"
    },
    {
      title: "Custom Rooms",
      description: "Create personalized quiz rooms with custom questions, time limits, and scoring systems.",
      icon: "🎯"
    },
    {
      title: "Analytics Dashboard",
      description: "Track participation, performance, and engagement with detailed analytics.",
      icon: "📊"
    },
    {
      title: "Reward System",
      description: "Incentivize learning with blockchain-based rewards and achievements.",
      icon: "🏆"
    }
  ]

const Features = () => {
    
  return (
    <section className='py-20 w-[95%] md:w-[90%] lg:w-[70%] mx-auto'>
        <h2 className='text-4xl font-bold text-white text-center mb-12'>
          Why Choose Our Platform?
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {fews.map((feature, index) => (
            <div key={index} className='p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all'>
              <div className='text-4xl mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
              <p className='text-gray-300'>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

  )
}

export default Features
