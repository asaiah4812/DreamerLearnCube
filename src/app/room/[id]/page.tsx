"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useWeb3React } from '@web3-react/core'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/button'
import { Award, Clock, Copy, Users } from 'lucide-react'
import { LoadingState } from '@/components/LoadingState'

type Room = {
  id: string
  name: string
  creator_address: string
  created_at: string
  is_active: boolean
}

type Question = {
  id: string
  question_text: string
  options: string[]
  correct_option: number
  points: number
  time_limit: number
  question_order: number
}

export default function RoomPage() {
  const params = useParams()
  const id = params?.id as string
  const { account } = useWeb3React()
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [participants, setParticipants] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    console.log('Room ID:', id)
    if (!id) return
    fetchRoomData()
  }, [id])

  const fetchRoomData = async () => {
    try {
      console.log('Fetching room data for ID:', id)
      
      // Fetch room details
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single()

      if (roomError) {
        console.error('Room error:', roomError)
        return
      }
      
      console.log('Room data:', roomData)
      setRoom(roomData)

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('room_id', id)
        .order('question_order', { ascending: true })

      if (questionsError) {
        console.error('Questions error:', questionsError)
        return
      }
      
      setQuestions(questionsData || [])

      // Count participants
      const { count, error: participantsError } = await supabase
        .from('participants')
        .select('*', { count: 'exact' })
        .eq('room_id', id)

      if (participantsError) {
        console.error('Participants error:', participantsError)
        return
      }
      
      setParticipants(count || 0)

    } catch (error) {
      console.error('Error fetching room data:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyRoomLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto py-8">
        <LoadingState message="Loading room details..." />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto py-8">
        <div className="text-center py-12 space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Room Not Found</h3>
            <p className="text-white/60 mb-6">This room doesn't exist or has been deleted.</p>
            <Button 
              onClick={() => router.push('/my-rooms')}
              className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
            >
              Back to My Rooms
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const isCreator = account === room.creator_address

  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{room.name}</h1>
          <div className="flex items-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm">
                Created {new Date(room.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span className="text-sm">{participants} participants</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={copyRoomLink}
            variant="outline"
            className="text-white hover:bg-white/5"
          >
            <Copy size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          {isCreator && room.is_active && (
            <Button
              className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
              onClick={() => router.push(`/room/${id}/start`)}
            >
              Start Quiz
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-500" size={20} />
            <h4 className="text-white font-medium">Participants</h4>
          </div>
          <p className="text-gray-400 text-sm">{participants} joined</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-blue-500" size={20} />
            <h4 className="text-white font-medium">Total Time</h4>
          </div>
          <p className="text-gray-400 text-sm">
            {questions.reduce((acc, q) => acc + q.time_limit, 0)} seconds
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-green-500" size={20} />
            <h4 className="text-white font-medium">Total Points</h4>
          </div>
          <p className="text-gray-400 text-sm">
            {questions.reduce((acc, q) => acc + q.points, 0)} points
          </p>
        </div>
      </div>

      {isCreator && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Questions</h2>
          {questions.map((question, index) => (
            <div 
              key={question.id}
              className="p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60">
                  {index + 1}
                </div>
                <h3 className="text-white font-medium">{question.question_text}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className={`p-3 rounded-lg ${
                      optionIndex === question.correct_option
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/5 text-white/60'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {question.time_limit} seconds
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  {question.points} points
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 