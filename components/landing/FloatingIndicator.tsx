"use client"

import { useEffect, useState } from "react"

export default function FloatingIndicator() {
  const [scrollY, setScrollY] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const updateDocumentHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight - window.innerHeight)
    }

    updateDocumentHeight()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateDocumentHeight)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateDocumentHeight)
    }
  }, [])

  return (
    <div className="fixed top-20 right-4 md:right-6 lg:right-8 z-30 pointer-events-none">
      <div
        className="transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${documentHeight > 0 ? (scrollY / documentHeight) * (window.innerHeight - 160) : 0}px) rotate(${scrollY * 0.5}deg)`,
        }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 drop-shadow-lg">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
              fill="#22c55e"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

