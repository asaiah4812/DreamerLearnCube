"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useWeb3React } from '@web3-react/core'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/button'
import { Award, Clock } from 'lucide-react'
import { LoadingState } from '@/components/LoadingState'

type Question = {
  id: string
  question_text: string
  options: string[]
  correct_option: number
  points: number
  time_limit: number
}

type Answer = {
  questionId: string
  selectedOption: number
  timeBonus: number
}

export default function PlayQuizPage() {
  const { id } = useParams()
  const { account } = useWeb3React()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!account || !id) {
      router.push('/join')
      return
    }
    fetchQuestions()
  }, [id, account])

  useEffect(() => {
    if (questions.length > 0 && !isQuizComplete) {
      setTimeLeft(questions[currentQuestionIndex].time_limit)
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleNextQuestion()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentQuestionIndex, questions])

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('room_id', id)
        .order('question_order', { ascending: true })

      if (error) throw error
      setQuestions(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOptionSelect = async (optionIndex: number) => {
    if (selectedOption !== null) return
    setSelectedOption(optionIndex)

    const currentQuestion = questions[currentQuestionIndex]
    const timeBonus = (timeLeft / currentQuestion.time_limit) * currentQuestion.points
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      timeBonus: Math.round(timeBonus)
    }

    setAnswers([...answers, answer])

    if (optionIndex === currentQuestion.correct_option) {
      setScore(prev => prev + Math.round(timeBonus))
    }

    setTimeout(handleNextQuestion, 1500)
  }

  const handleNextQuestion = async () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
    } else {
      setIsQuizComplete(true)
      try {
        await supabase
          .from('participants')
          .update({ 
            score,
            completed: true 
          })
          .eq('room_id', id)
          .eq('wallet_address', account)

        fetchLeaderboard()
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const [leaderboard, setLeaderboard] = useState<{ wallet_address: string, score: number }[]>([])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('wallet_address, score')
        .eq('room_id', id)
        .order('score', { ascending: false })
        .limit(10)

      if (error) throw error
      setLeaderboard(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <LoadingState message="Loading quiz..." />
  }

  if (isQuizComplete) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
            <p className="text-2xl text-white mb-2">Your score: {score} points</p>
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-sky-600 to-sky-800 flex items-center justify-center mx-auto mb-8">
              <Award className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((participant, index) => (
                <div
                  key={participant.wallet_address}
                  className={`p-4 rounded-lg ${
                    participant.wallet_address === account
                      ? 'bg-sky-500/20 border border-sky-500/50'
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60">
                        {index + 1}
                      </div>
                      <div className="text-white">
                        {participant.wallet_address.slice(0, 6)}...
                        {participant.wallet_address.slice(-4)}
                      </div>
                    </div>
                    <div className="text-white font-medium">
                      {participant.score} points
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock size={20} />
              {timeLeft} seconds
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-sky-500 h-2 rounded-full transition-all duration-1000"
              style={{ 
                width: `${(timeLeft / currentQuestion.time_limit) * 100}%` 
              }}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            {currentQuestion.question_text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedOption === null
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : selectedOption === index
                      ? selectedOption === currentQuestion.correct_option
                        ? 'bg-green-500/20 border-2 border-green-500 text-white'
                        : 'bg-red-500/20 border-2 border-red-500 text-white'
                      : index === currentQuestion.correct_option && selectedOption !== null
                        ? 'bg-green-500/20 border-2 border-green-500 text-white'
                        : 'bg-white/5 text-white/60'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-white/60">
          This question is worth {currentQuestion.points} points
        </div>
      </div>
    </div>
  )
} 