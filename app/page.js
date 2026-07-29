'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [opening, setOpening] = useState(false)
  const router = useRouter()

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => router.push('/messages'), 900)
  }

  return (
    <main className={`letter-opening-page ${opening ? 'opening' : ''}`}>
      <div className="letter-background" />
      <button
        className="letter-button"
        onClick={handleOpen}
        aria-label="Buka surat untuk Qina"
      >
        <img src="/letter.jpg" alt="Surat untuk Qina" className="letter-image" />
        <div className="letter-label">Klik surat untuk membuka pesan</div>
      </button>
      <div className="tear-overlay">
        <div className="tear-half top" />
        <div className="tear-half bottom" />
      </div>
    </main>
  )
}
