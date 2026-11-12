import { useState } from 'react'

export default function InfonLogo({ className = 'w-12 h-12', isDark = false, showReplay = false }) {
  const [key, setKey] = useState(0)

  const handleReplay = () => {
    setKey((prev) => prev + 1)
  }

  const textColor = isDark ? '#ffffff' : '#004b7c'
  const navyArc = isDark ? '#3b8fd6' : '#004b7c'
  const sparkColor = '#ffb020'

  return (
    <div className="inline-flex flex-col items-center">
      <svg
        key={key}
        viewBox="0 0 390 389"
        role="img"
        aria-label="InFON logo"
        className={`overflow-visible ${className}`}
      >
        <style>{`
          .infon-arc {
            fill: none;
            stroke-width: 19.5;
            stroke-linecap: round;
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            transform-origin: 194.5px 193.5px;
            animation: infon-arc-anim 1.1s cubic-bezier(.45,.05,.25,1) both;
          }
          .infon-a-purple { animation-delay: 0.15s; }
          .infon-a-pink   { animation-delay: 0.15s; }
          .infon-a-teal   { animation-delay: 0.5s; }
          .infon-a-yellow { animation-delay: 0.5s; }
          .infon-a-navy   { animation-delay: 0.85s; }
          .infon-a-salmon { animation-delay: 1.2s; }

          .infon-lt {
            fill: none;
            stroke: ${textColor};
            stroke-width: 11;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            opacity: 0;
          }
          .infon-i-stem { animation: infon-draw 0.4s ease 2.4s forwards; }
          .infon-n-path { animation: infon-draw 0.6s ease 2.9s forwards; }
          .infon-i-dot  {
            transform-box: fill-box;
            transform-origin: center;
            animation: infon-dot 0.6s cubic-bezier(.3,1.8,.5,1) 2.75s both;
          }
          .infon-ring {
            fill: none;
            stroke: ${sparkColor};
            stroke-width: 3;
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;
            animation: infon-ring-anim 2.4s ease-out 3.7s infinite;
          }

          @keyframes infon-arc-anim {
            from { stroke-dashoffset: 1; transform: rotate(-80deg); opacity: 0; }
            2% { opacity: 1; }
            to { stroke-dashoffset: 0; transform: rotate(0); }
          }
          @keyframes infon-draw {
            from { stroke-dashoffset: 1; opacity: 1; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes infon-dot {
            from { transform: scale(0) translateY(-40px); opacity: 1; }
            to { transform: none; opacity: 1; }
          }
          @keyframes infon-ring-anim {
            0% { transform: scale(1); opacity: .9; }
            100% { transform: scale(3.4); opacity: 0; }
          }
        `}</style>
        <g id="fon-mark">
          <path className="infon-arc infon-a-purple" pathLength="1" stroke="#9b95c9" d="M379.0 190.4A184.5 184.5 0 0 1 165.7 375.7" />
          <path className="infon-arc infon-a-pink" pathLength="1" stroke="#d057a0" d="M339.4 80.1A184.0 184.0 0 1 0 91.5 346.0" />
          <path className="infon-arc infon-a-teal" pathLength="1" stroke="#60c3ad" d="M332.6 217.8A140.2 140.2 0 1 1 106.3 84.5" />
          <path className="infon-arc infon-a-yellow" pathLength="1" stroke="#ffcd67" d="M323.7 138.7A140.3 140.3 0 0 0 160.5 57.4" />
          <path className="infon-arc infon-a-navy" pathLength="1" stroke={navyArc} d="M100.2 212.1A96.1 96.1 0 1 1 139.1 272.0" />
          <path className="infon-arc infon-a-salmon" pathLength="1" stroke="#f48580" d="M146.2 172.6A52.6 52.6 0 1 0 185.0 141.8" />
        </g>
        <g id="letters" transform="translate(194.5 194) scale(1.15)">
          <path className="infon-lt infon-i-stem" pathLength="1" d="M-22 -3V20" />
          <circle className="infon-i-dot" cx="-22" cy="-19" r="7" fill={sparkColor} opacity="0" />
          <circle className="infon-ring" cx="-22" cy="-19" r="7" />
          <path className="infon-lt infon-n-path" pathLength="1" d="M-5 20V6Q-5 -4 9 -4Q23 -4 23 6V20" />
        </g>
      </svg>
      {showReplay && (
        <button
          onClick={handleReplay}
          className="mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-colors"
          title="Ponovi animaciju logotipa"
        >
          Ponovi animaciju
        </button>
      )}
    </div>
  )
}
