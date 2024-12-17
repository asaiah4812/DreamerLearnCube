"use client"
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/button'
import { Clock, Users } from 'lucide-react'
import { LoadingState } from '@/components/LoadingState'

type Room = {
  id: string
  name: string
  created_at: string
  is_active: boolean
  _count?: {
    participants: number
  }
}

export default function MyRoomsPage() {
  const { account } = useWeb3React()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (account) {
      console.log('Fetching rooms for account:', account)
      fetchRooms()
    }
  }, [account])

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select(`
          *,
          participants:participants(count)
        `)
        .eq('creator_address', account)
        .order('created_at', { ascending: false })

      if (error) throw error
      console.log('Fetched rooms:', data)
      setRooms(data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!account) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <p className="text-white text-xl">Please connect your wallet to view your rooms</p>
      </div>
    )
  }

  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Rooms</h1>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white">
            Create New Room
          </Button>
        </Link>
      </div>

      {loading ? (
        <LoadingState message="Loading your rooms..." />
      ) : rooms.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">No Rooms Yet</h3>
            <p className="text-white/60 mb-6">Create your first quiz room and start engaging with participants!</p>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white">
                Create Your First Room
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link 
              href={`/room/${room.id}`} 
              key={room.id}
              className="block"
            >
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/50 transition-all group backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-sky-400">
                  {room.name}
                </h3>
                <div className="flex items-center gap-6 text-white/60">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm">
                      {new Date(room.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="text-sm">
                      {room._count?.participants || 0} participants
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    room.is_active 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {room.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}