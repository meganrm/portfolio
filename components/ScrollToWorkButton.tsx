'use client'

import { ArrowRight } from 'lucide-react'

export default function ScrollToWorkButton() {
  const handleClick = () => {
    const el = document.getElementById('work')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      See selected work <ArrowRight size={17} />
    </button>
  )
}
