import { useState } from 'react'

export default function CssIndicator() {
  const [showCSSDebug, setShowCSSDebug] = useState(false)

  if (process.env.NODE_ENV === 'production')
    return null

  function toggleCSSDebug() {
    const newState = !showCSSDebug
    setShowCSSDebug(newState)

    document.querySelectorAll('*').forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.border = newState ? '1px solid red' : ''
      }
    })
  }

  return (
    <button
      onClick={toggleCSSDebug}
      className="fixed bottom-1 left-8 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white transition-colors hover:bg-gray-700"
    >
      <span className={showCSSDebug ? 'text-green-400' : 'text-gray-400'}>CSS</span>
    </button>
  )
}
