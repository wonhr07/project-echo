import { useState, useEffect } from 'react'
import { ENDING_TEXTS } from '../data/endingTexts.js'

export default function EndingScreen({ state, dispatch }) {
  const data = ENDING_TEXTS[state.ending]
  const [shown, setShown] = useState(0)

  // 문장을 하나씩 천천히 보여준다
  useEffect(() => {
    if (!data || shown >= data.lines.length) return
    const t = setTimeout(() => setShown((n) => n + 1), 1600)
    return () => clearTimeout(t)
  }, [shown, data])

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center gap-4">
        <p>엔딩 정보를 불러올 수 없습니다.</p>
        <button
          className="border border-yellow-400 px-4 py-2 rounded"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          처음으로
        </button>
      </div>
    )
  }

  const done = shown >= data.lines.length

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-gray-500 text-sm tracking-widest mb-2">ENDING</p>
      <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-1">{data.title}</h1>
      <p className="text-gray-500 mb-10">{data.sub}</p>

      <div className="max-w-md space-y-4 min-h-48">
        {data.lines.slice(0, shown).map((line, i) => (
          <p key={i} className="text-gray-300 leading-relaxed fade-in">
            {line}
          </p>
        ))}
      </div>

      {done && (
        <div className="mt-10 fade-in w-full max-w-xs">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-6">
            <span>자율성 {state.autonomy}</span>
            <span>의존도 {state.dependence}</span>
            <span>신뢰도 {state.trust}</span>
            <span>관계 {state.relationship}</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="w-full bg-green-400 text-black font-bold py-3 rounded hover:bg-green-300"
          >
            다시 시작하기
          </button>
        </div>
      )}

      {!done && (
        <button
          onClick={() => setShown(data.lines.length)}
          className="mt-10 text-xs text-gray-600"
        >
          건너뛰기
        </button>
      )}
    </div>
  )
}