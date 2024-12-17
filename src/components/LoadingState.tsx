import { Loader2 } from 'lucide-react'

export const LoadingState = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="flex items-center justify-center gap-3 text-white">
      <Loader2 className="animate-spin" size={24} />
      <span>{message}</span>
    </div>
  )
} 