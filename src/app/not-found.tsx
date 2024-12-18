"use client"
import Link from 'next/link'
import { Button } from '@/components/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        {/* 404 Text with Gradient */}
        <h1 className="text-[150px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          404
        </h1>

        {/* Glowing Circle Behind 404 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-[300px] h-[300px] rounded-full bg-sky-500/20 blur-3xl" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Oops! It seems you&apos;ve ventured into unknown territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-sky-800/30 blur-3xl" />
          <div className="absolute right-[15%] bottom-[30%] h-32 w-32 rounded-full bg-sky-600/20 blur-3xl" />
        </div>
      </div>
    </div>
  )
} 