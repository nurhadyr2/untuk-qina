'use client'

import { useEffect, useRef } from 'react'

export default function AudioPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    const handleStart = async () => {
      if (!audioRef.current) return
      try {
        audioRef.current.volume = 0.06
        audioRef.current.currentTime = 0
        await audioRef.current.play()
      } catch (err) {
        // Autoplay may still be blocked until user interaction; ignore.
      }
    }

    document.addEventListener('startMusic', handleStart)
    return () => document.removeEventListener('startMusic', handleStart)
  }, [])

  return (
    <audio ref={audioRef} id="persistent-audio" loop preload="auto" src="/1x.mp3" />
  )
}
