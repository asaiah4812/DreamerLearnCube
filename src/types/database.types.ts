export type Room = {
  id: string
  name: string
  creator_address: string
  created_at: string
  contract_address?: string // Will be filled when smart contract is deployed
  is_active: boolean
}

export type Question = {
  id: string
  room_id: string
  question_text: string
  options: string[] // Store as JSON array
  correct_option: number // Index of correct option (0-3)
  points: number
  time_limit: number // in seconds
  question_order: number
}

export type Participant = {
  id: string
  room_id: string
  wallet_address: string
  score: number
  completed: boolean
  joined_at: string
}

export type Database = {
  public: {
    Tables: {
      rooms: {
        Row: Room
        Insert: Omit<Room, 'id' | 'created_at'>
        Update: Partial<Omit<Room, 'id' | 'created_at'>>
      }
      questions: {
        Row: Question
        Insert: Omit<Question, 'id'>
        Update: Partial<Omit<Question, 'id'>>
      }
      participants: {
        Row: Participant
        Insert: Omit<Participant, 'id' | 'joined_at'>
        Update: Partial<Omit<Participant, 'id' | 'joined_at'>>
      }
    }
  }
} 