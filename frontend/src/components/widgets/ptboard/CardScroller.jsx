import React, { useRef } from 'react'
import CardBox from './CardBox'

const CardScroller = ({ title = 'Reihe', items = [] }) => {
  const scrollRef = useRef(null)

  const handleMouseDown = (e) => {
    const startX = e.pageX - scrollRef.current.offsetLeft
    const scrollLeft = scrollRef.current.scrollLeft

    const handleMouseMove = (e) => {
      const x = e.pageX - scrollRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="flex flex-col gap-2 relative">
      {/* Titel */}
      <h3 className="text-white text-sm font-medium">{title}</h3>

      {/* Fade links */}
      <div className="pointer-events-none absolute left-0 top-[28px] h-[90px] w-6 z-10 bg-gradient-to-r from-[#34303a] to-transparent" />

      {/* Fade rechts */}
      <div className="pointer-events-none absolute right-0 top-[28px] h-[90px] w-6 z-10 bg-gradient-to-l from-[#34303a] to-transparent" />

      {/* Scrollbereich */}
      <div
        ref={scrollRef}
        className="flex flex-row flex-nowrap gap-3 pr-2 w-full overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: 'none',              // Firefox
          msOverflowStyle: 'none',             // IE/Edge
          WebkitOverflowScrolling: 'touch',    // iOS
          overflowY: 'hidden',
          touchAction: 'pan-x',
          cursor: 'grab',
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {items.map((item, idx) => (
          <CardBox key={idx} borderColor={item.color}>
            {item.label}
          </CardBox>
        ))}
      </div>

      {/* Scrollbar ausblenden für Chrome/Safari */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default CardScroller
