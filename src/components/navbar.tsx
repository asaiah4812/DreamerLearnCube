"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import WalletButton from './WalletButtons'
import { AlignJustify, CircleX } from 'lucide-react'
import { useWeb3React } from '@web3-react/core'

const Links = [
  {
    id: 1,
    name: 'Home',
    url: '/'
  },
  {
    id: 2,
    name: 'My Rooms',
    url: '/my-rooms',
    requiresAuth: true
  },
  {
    id: 3,
    name: 'About',
    url: '/about'
  },
  {
    id: 4,
    name: 'Contact',
    url: '/contact'
  },
]

const Navbar = () => {
  const [showSide, setShowSide] = useState<boolean>(false)
  const { account } = useWeb3React()

  const filteredLinks = Links.filter(link => 
    !link.requiresAuth || (link.requiresAuth && account)
  )

  return (
    <div className='flex justify-between items-center mx-auto py-10 w-[95%] md:w-[90%] xl:w-[70%]'>
      <div>
        <Link href={'/'}
          className='bg-sky-700/70 px-4 py-3 text-white font-bold border border-solid border-t-4 text-lg rounded-tl-3xl rounded-tr-full rounded-bl-xl'
        >
         LearnCube!
        </Link>
      </div>
      <div className='space-x-6 flex bg-slate-600/10 backdrop-blur-md py-5 px-7 rounded-full'>
        {filteredLinks.map(link => (
          <Link
            className='px-4 py-3 hidden lg:flex text-white hover:bg-slate-400/10 rounded-full hover:backdrop-blur-md'
            href={link.url}
            key={link.id}
          >
            {link.name}
          </Link>
        ))}
        <button onClick={() => setShowSide(prev => !prev)} className='block lg:hidden text-white px-4 py-3'>
          <AlignJustify className='' />
        </button>
        <div className="hidden lg:block">
        <WalletButton />

        </div>
      </div>
      {showSide && (
        <div className='fixed z-40 px-5 py-3 top-0 right-0 bg-black/80 min-h-screen flex flex-col w-[250px]'>
          <button onClick={() => setShowSide(false)} className='block lg:hidden text-white px-4 py-3'>
            <CircleX />
          </button>
          
          {filteredLinks.map(link => (
            <Link
              className='px-4 py-3 text-white'
              href={link.url}
              key={link.id}
              onClick={() => setShowSide(false)}
            >
              {link.name}
            </Link>
          ))}
          <WalletButton />
        </div>
      )}
    </div>
  )
}

export default Navbar
