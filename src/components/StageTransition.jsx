import { useEffect } from 'react'
import { STAGES } from '../data/stages.js'

export default function StageTransition({ stage, onDone }) {
  const info = STAGES[stage - 1]

  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 cursor-pointer"
      onClick={onDone}
    >
      <p className="text-gray-500 text-sm mb-2">STAGE {stage}</p>
      <h2 className="text-5xl font-bold text-green-400 mb-3">{info.time}</h2>
      <p className="text-gray-300 text-xl">{info.place}</p>
      <p className="text-gray-600 text-xs mt-10">(클릭하면 바로 넘어갑니다)</p>
    </div>
  )
}