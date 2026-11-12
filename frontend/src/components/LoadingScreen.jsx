import { useState, useEffect } from 'react'
import InfonLogo from './InfonLogo'

export default function LoadingScreen({ onFinish, minDuration = 2200 }) {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Omogući da se animacija u potpunosti prikaže pre sakrivanja
    const timer = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setHidden(true)
        if (onFinish) onFinish()
      }, 500) // Trajanje fade-out animacije
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration, onFinish])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-gold-500/10 blur-2xl pointer-events-none translate-y-12" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated inFON SVG Logo */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-4">
          <InfonLogo className="w-full h-full" isDark={true} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider mb-2">
          inFON
        </h1>
        <p className="text-blue-200 text-xs sm:text-sm font-medium tracking-wide">
          Svi događaji, jedno mesto
        </p>

        {/* Minimalist animated loader line */}
        <div className="w-36 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
