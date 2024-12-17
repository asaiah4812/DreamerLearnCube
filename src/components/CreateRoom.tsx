"use client"
import { useState } from 'react'
import { Button } from './button'
import { supabase } from '@/lib/supabase'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/navigation'
import { QuestionForm } from './QuestionForm'

type Question = {
  question_text: string
  options: string[]
  correct_option: number
  points: number
  time_limit: number
}

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const { account } = useWeb3React()
  const router = useRouter()

  const handleCreateRoom = async () => {
    if (!roomName || !account || questions.length === 0) {
      console.log('Validation failed:', { roomName, account, questionsLength: questions.length })
      return
    }

    setCreating(true)

    try {
      console.log('Creating room with data:', {
        name: roomName,
        creator_address: account,
        is_active: true
      })

      // First create the room
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .insert({
          name: roomName,
          creator_address: account,
          is_active: true
        })
        .select()
        .single()

      if (roomError) {
        console.error('Error creating room:', roomError)
        throw roomError
      }

      console.log('Room created successfully:', room)

      // Then add all questions
      const questionsWithOrder = questions.map((q, index) => ({
        ...q,
        room_id: room.id,
        question_order: index + 1
      }))

      console.log('Adding questions:', questionsWithOrder)

      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .insert(questionsWithOrder)
        .select()

      if (questionsError) {
        console.error('Error adding questions:', questionsError)
        throw questionsError
      }

      console.log('Questions added successfully:', questionsData)
      console.log('Redirecting to:', `/room/${room.id}`)
      
      // Add a small delay before redirecting
      setTimeout(() => {
        router.push(`/room/${room.id}`)
      }, 500)

    } catch (error) {
      console.error('Error in room creation process:', error)
    } finally {
      setCreating(false)
    }
  }

  const handleAddQuestions = (question: Question) => {
    console.log('Adding question:', question)
    setQuestions(prev => [...prev, question])
    setShowQuestionForm(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full p-2 rounded-md border bg-white/10 text-white"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Questions ({questions.length})</h3>
          {!showQuestionForm && (
            <Button 
              onClick={() => setShowQuestionForm(true)} 
              className='text-white bg-sky-800 hover:bg-sky-900'
            >
              Add Questions
            </Button>
          )}
        </div>

        {questions.map((q, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/10 text-white">
            <h4 className="font-semibold">Question {index + 1}</h4>
            <p>{q.question_text}</p>
            <div className="mt-2">
              {q.options.map((opt, i) => (
                <div key={i} className={`${i === q.correct_option ? 'text-green-400' : ''}`}>
                  {i + 1}. {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showQuestionForm && (
        <QuestionForm 
          onSubmit={handleAddQuestions} 
          onCancel={() => setShowQuestionForm(false)} 
        />
      )}

      <div className="pt-4">
        <Button 
          className='text-white bg-sky-800'
          onClick={handleCreateRoom}
          disabled={!roomName || questions.length === 0 || creating}
        >
          {creating ? 'Creating Room...' : 'Create Room'}
        </Button>
      </div>
    </div>
  )
} 