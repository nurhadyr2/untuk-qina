'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [opening, setOpening] = useState(false)
  const particlesRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (!opening || !particlesRef.current) return

    const particles = []
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('span')
      const x = Math.random() * 12 + 44
      const y = Math.random() * 80 + 10
      const dx = (Math.random() < 0.5 ? -1 : 1) * (100 + Math.random() * 80)
      const dy = Math.random() * 140 - 70
      const size = Math.random() * 3 + 2
      const rotate = Math.random() * 360
      particle.className = 'tear-particle'
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size * 1.4}px`
      particle.style.setProperty('--dx', `${dx}px`)
      particle.style.setProperty('--dy', `${dy}px`)
      particle.style.setProperty('--rot', `${rotate}deg`)
      particlesRef.current.appendChild(particle)
      particles.push(particle)
    }

    const cleanup = window.setTimeout(() => {
      particles.forEach((p) => p.remove())
    }, 1200)

    return () => {
      window.clearTimeout(cleanup)
      particles.forEach((p) => p.remove())
    }
  }, [opening])

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    document.dispatchEvent(new CustomEvent('startMusic'))
    window.setTimeout(() => {
      router.push('/messages')
    }, 1150)
  }

  return (
    <main className={`letter-opening-page ${opening ? 'opening' : ''}`}>
      <div className="letter-background" />
      <button
        className="letter-button"
        onClick={handleOpen}
        aria-label="Buka surat untuk Qina"
      >
        <div className="letter-scene" aria-hidden="true">
          <div className="letter-sheet left">
            <img src="/utuh.png" alt="Surat utuh bagian kiri" />
          </div>
          <div className="letter-sheet right">
            <img src="/utuh.png" alt="Surat utuh bagian kanan" />
          </div>          <div className="particle-layer" ref={particlesRef} />
        </div>
        <div className="letter-label">Klik surat untuk membuka pesan</div>
      </button>
    </main>
  )
}