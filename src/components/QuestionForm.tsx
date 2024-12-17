"use client"
import { useState } from 'react'
import { Button } from './button'
import { ChevronDown, ChevronUp, Plus, X, CheckCircle2, Clock, Award } from 'lucide-react'

type QuestionFormProps = {
  onSubmit: (question: {
    question_text: string
    options: string[]
    correct_option: number
    points: number
    time_limit: number
  }) => void
  onCancel: () => void
}

export const QuestionForm = ({ onSubmit, onCancel }: QuestionFormProps) => {
  const [questions, setQuestions] = useState([{
    questionText: '',
    options: ['', '', '', ''],
    correctOption: 0,
    points: 100,
    timeLimit: 30,
    isOpen: true
  }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lastQuestion = questions[questions.length - 1]
    
    if (!lastQuestion.questionText || lastQuestion.options.some(opt => !opt)) return

    onSubmit({
      question_text: lastQuestion.questionText,
      options: lastQuestion.options,
      correct_option: lastQuestion.correctOption,
      points: lastQuestion.points,
      time_limit: lastQuestion.timeLimit
    })

    setQuestions([...questions, {
      questionText: '',
      options: ['', '', '', ''],
      correctOption: 0,
      points: 100,
      timeLimit: 30,
      isOpen: true
    }])
  }

  const toggleAccordion = (index: number) => {
    setQuestions(questions.map((q, i) => ({
      ...q,
      isOpen: i === index ? !q.isOpen : false
    })))
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const isQuestionComplete = (question: typeof questions[0]) => {
    return question.questionText && !question.options.some(opt => !opt)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="text-purple-500" size={20} />
            <h4 className="text-white font-medium">Questions</h4>
          </div>
          <p className="text-gray-400 text-sm">{questions.length} questions added</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-blue-500" size={20} />
            <h4 className="text-white font-medium">Total Time</h4>
          </div>
          <p className="text-gray-400 text-sm">
            {questions.reduce((acc, q) => acc + q.timeLimit, 0)} seconds
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

      <div className="space-y-4">
        {questions.map((question, questionIndex) => (
          <div 
            key={questionIndex}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              question.isOpen 
                ? 'bg-white/5 border-sky-500/50 shadow-lg shadow-sky-500/10' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div 
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleAccordion(questionIndex)}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${isQuestionComplete(question) 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white/60'}
                `}>
                  {questionIndex + 1}
                </div>
                <h3 className="text-white font-medium">
                  {question.questionText || "New Question"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {questionIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeQuestion(questionIndex)
                    }}
                    className="p-1.5 hover:bg-red-500/20 rounded-full text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
                {question.isOpen ? (
                  <ChevronUp className="text-white/60" size={20} />
                ) : (
                  <ChevronDown className="text-white/60" size={20} />
                )}
              </div>
            </div>

            {question.isOpen && (
              <div className="p-6 border-t border-white/10 space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Question Text</label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => {
                      const newQuestions = [...questions]
                      newQuestions[questionIndex].questionText = e.target.value
                      setQuestions(newQuestions)
                    }}
                    className="w-full p-3 rounded-lg border bg-white/5 text-white placeholder-white/40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                    placeholder="Enter your question here..."
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-white/80 text-sm mb-4">Answer Options</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newQuestions = [...questions]
                            newQuestions[questionIndex].options[optionIndex] = e.target.value
                            setQuestions(newQuestions)
                          }}
                          className={`w-full p-3 pl-12 rounded-lg border bg-white/5 text-white placeholder-white/40 
                            ${question.correctOption === optionIndex ? 'border-green-500/50 ring-1 ring-green-500/50' : ''}
                            focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all`}
                          placeholder={`Option ${optionIndex + 1}`}
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            checked={question.correctOption === optionIndex}
                            onChange={() => {
                              const newQuestions = [...questions]
                              newQuestions[questionIndex].correctOption = optionIndex
                              setQuestions(newQuestions)
                            }}
                            className="w-4 h-4 text-green-500 focus:ring-green-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-white/60 mt-2">
                    Select the radio button next to the correct answer
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Points</label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="number"
                        value={question.points}
                        onChange={(e) => {
                          const newQuestions = [...questions]
                          newQuestions[questionIndex].points = Number(e.target.value)
                          setQuestions(newQuestions)
                        }}
                        min="0"
                        className="w-full p-3 pl-10 rounded-lg border bg-white/5 text-white focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Time Limit (seconds)</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="number"
                        value={question.timeLimit}
                        onChange={(e) => {
                          const newQuestions = [...questions]
                          newQuestions[questionIndex].timeLimit = Number(e.target.value)
                          setQuestions(newQuestions)
                        }}
                        min="5"
                        className="w-full p-3 pl-10 rounded-lg border bg-white/5 text-white focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={onCancel}
          variant="outline"
          className="text-white hover:bg-white/5"
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            onClick={(e) => {
              e.preventDefault()
              setQuestions([...questions, {
                questionText: '',
                options: ['', '', '', ''],
                correctOption: 0,
                points: 100,
                timeLimit: 30,
                isOpen: true
              }])
            }}
            variant="outline"
            className="text-white hover:bg-white/5"
          >
            <Plus size={18} className="mr-2" />
            Add Question
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white shadow-lg shadow-sky-600/20"
          >
            Save All Questions
          </Button>
        </div>
      </div>
    </div>
  )
} 