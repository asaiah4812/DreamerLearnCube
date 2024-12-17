"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useWeb3React } from '@web3-react/core'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/button'
import { LoadingState } from '@/components/LoadingState'
import { Users } from 'lucide-react'

type Room = {
  id: string
  name: string
  is_active: boolean
}

export default function JoinRoomPage() {
  const { id } = useParams()
  const { account } = useWeb3React()
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [participants, setParticipants] = useState<number>(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!account) {
      router.push('/join')
      return
    }
    fetchRoomData()
  }, [id, account])

  const fetchRoomData = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setRoom(data)

      // Get participant count
      const { count } = await supabase
        .from('participants')
        .select('*', { count: 'exact' })
        .eq('room_id', id)

      setParticipants(count || 0)
    } catch (error) {
      console.error('Error:', error)
      setError('Room not found')
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async () => {
    if (!room || !account) return
    setJoining(true)

    try {
      // Check if already joined
      const { data: existing } = await supabase
        .from('participants')
        .select('*')
        .eq('room_id', id)
        .eq('wallet_address', account)
        .single()

      if (existing) {
        router.push(`/room/${id}/play`)
        return
      }

      // Join room
      const { error } = await supabase
        .from('participants')
        .insert({
          room_id: id,
          wallet_address: account,
          score: 0,
          completed: false
        })

      if (error) throw error

      router.push(`/room/${id}/play`)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to join room')
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading room details..." />
  }

  if (error || !room) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Room Not Found</h1>
          <p className="text-gray-400 mb-8">This room doesn't exist or has been deleted.</p>
          <Button
            onClick={() => router.push('/join')}
            className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
          >
            Back to Join Page
          </Button>
        </div>
      </div>
    )
  }

  if (!room.is_active) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Room Inactive</h1>
          <p className="text-gray-400 mb-8">This room is no longer active.</p>
          <Button
            onClick={() => router.push('/join')}
            className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
          >
            Back to Join Page
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{room.name}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <Users size={20} />
            <span>{participants} participants</span>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-white">
                Connected as: <span className="text-sky-400">{account}</span>
              </p>
            </div>

            <Button
              onClick={handleJoin}
              disabled={joining}
              className="w-full bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white py-3"
            >
              {joining ? 'Joining...' : 'Join Room'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 