"use client"
import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const onInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    try {
      const choice = await deferredPrompt.userChoice
      // choice.outcome is 'accepted' or 'dismissed'
      setVisible(false)
      setDeferredPrompt(null)
    } catch (err) {
      // ignore
      setVisible(false)
      setDeferredPrompt(null)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onInstall}
        className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow-md"
        aria-label="Install CitiZen"
      >
        Install App
      </button>
    </div>
  )
}
