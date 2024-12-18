"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useWeb3React } from '@web3-react/core'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/button'
import { LoadingState } from '@/components/LoadingState'
import { Clock, Users, Play, CheckCircle2 } from 'lucide-react'

type Room = {
  id: string
  name: string
  creator_address: string
  is_active: boolean
}

type Question = {
  id: string
  question_text: string
  options: string[]
  points: number
  time_limit: number
}

export default function StartQuizPage() {
  const { id } = useParams()
  const { account } = useWeb3React()
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [participants, setParticipants] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    if (!account || !id) {
      router.push('/my-rooms')
      return
    }
    fetchRoomData()
  }, [id, account])

  const fetchRoomData = async () => {
    try {
      // Fetch room details
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single()

      if (roomError) throw roomError
      setRoom(roomData)

      // Verify creator
      if (roomData.creator_address !== account) {
        router.push(`/room/${id}`)
        return
      }

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('room_id', id)
        .order('question_order', { ascending: true })

      if (questionsError) throw questionsError
      setQuestions(questionsData || [])

      // Count participants
      const { count } = await supabase
        .from('participants')
        .select('*', { count: 'exact' })
        .eq('room_id', id)

      setParticipants(count || 0)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartQuiz = async () => {
    if (!room || starting) return
    setStarting(true)

    try {
      // Reset all participants' scores and completion status
      await supabase
        .from('participants')
        .update({
          score: 0,
          completed: false
        })
        .eq('room_id', id)

      // Update room status if needed
      await supabase
        .from('rooms')
        .update({ is_active: true })
        .eq('id', id)

      router.push(`/room/${id}/monitor`)
    } catch (error) {
      console.error('Error:', error)
      setStarting(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading quiz details..." />
  }

  if (!room || room.creator_address !== account) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">You don&apos;t have permission to start this quiz.</p>
          <Button
            onClick={() => router.push('/my-rooms')}
            className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white"
          >
            Back to My Rooms
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">{room.name}</h1>
          <p className="text-gray-400">Ready to start the quiz?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-sky-400" />
              <h3 className="text-white font-medium">Participants</h3>
            </div>
            <p className="text-2xl text-white">{participants}</p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-sky-400" />
              <h3 className="text-white font-medium">Total Time</h3>
            </div>
            <p className="text-2xl text-white">
              {questions.reduce((acc, q) => acc + q.time_limit, 0)} seconds
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quiz Overview</h2>
          {questions.map((question, index) => (
            <div 
              key={question.id}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-white font-medium">{question.question_text}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {question.time_limit}s
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      {question.points} points
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleStartQuiz}
            disabled={starting || participants === 0}
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-8 py-4 text-lg"
          >
            {starting ? (
              'Starting Quiz...'
            ) : participants === 0 ? (
              'Waiting for Participants'
            ) : (
              <>
                <Play className="mr-2" />
                Start Quiz
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 