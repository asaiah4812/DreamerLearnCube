"use client"
import { CreateRoom } from "@/components/CreateRoom"
import { useWeb3React } from '@web3-react/core'
import { useRouter } from "next/navigation"

export default function CreatePage() {
  const { account } = useWeb3React()
  const router = useRouter()

  if (!account) {
    return (
      <div className="h-50vh flex items-center justify-center">
        <p className="text-white text-xl">Please connect your wallet to create a room</p>
      </div>
    )
  }

  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto md:p-10  backdrop-blur-md rounded-md">
      <h1 className="text-3xl font-bold text-white mb-8">Create a New Room</h1>
      <CreateRoom />
    </div>
  )
} 