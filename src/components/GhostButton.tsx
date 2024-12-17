import Link from 'next/link';
import React from 'react'

interface GhostButtonProps {
  link: string;
  text: string;
}

const GhostButton: React.FC<GhostButtonProps> = ({link, text}) => {
  return (
    <Link href={link} className='px-6 py-4 rounded-full bg-sky-800/40 hover:bg-sky-900/40 text-white'>
      {text}
    </Link>
  )
}

export default GhostButton;
