import { useState, useRef } from 'react'
import {
  STAGES,
  getAiDraft,
  getOutcome,
  shouldOfferControl,
  canWriteManually,
  MANUAL_PENALTY,
} from '../data/stages.js'
import { getPersonality } from '../game/personality.js'
import {
  AI_INTRO,
  AI_REACT,
  EMOTION,
  CONTROL_OFFER,
  CONTROL_ACCEPT_LABEL,
  CONTROL_REJECT_LABEL,
  AI_AFTER_ACCEPT,
  AI_AFTER_REJECT,
  LOCKED_MESSAGE,
  getMimicLine,
  OVERWRITE_LINES,
} from '../data/aiLines.js'
import StatusBar from './StatusBar.jsx'
import AIChat from './AIChat.jsx'

export default function GameScreen({ state, dispatch }) {
  const info = STAGES[state.stage - 1]
  const personality = getPersonality(state.autonomy)
  const emotion = EMOTION[personality]

  const [mode, setMode] = useState('choose') // choose | manual | draft
  const [text, setText] = useState('')
  const [aiDraft, setAiDraft] = useState('')
  const [controlAnswer, setControlAnswer] = useState(null) // accepted | rejected

  const manualAllowed = canWriteManually(state)
    const overwritten = useRef(false)
  const [overwriteMsg, setOverwriteMsg] = useState('')

  // 자율성이 낮을 때, 직접 쓰는 도중 AI가 문장을 한 번 덮어쓴다
  const handleManualChange = (e) => {
    const v = e.target.value
    if (
      !overwritten.current &&
      state.autonomy <= 70 &&
      state.stage >= 3 &&
      v.length >= 12
    ) {
      overwritten.current = true
      const draft = getAiDraft(state.stage, state)
      setText(draft)
      setOverwriteMsg(
        OVERWRITE_LINES[Math.floor(Math.random() * OVERWRITE_LINES.length)]
      )
      return
    }
    setText(v)
  }
  const last = state.choiceHistory[state.choiceHistory.length - 1]

  const submit = (action) => {
    const finalText = text.trim()
    const outcome = getOutcome(state.stage, action, finalText, state)
    dispatch({
      type: 'CHOOSE',
      action,
      text: finalText,
            relationshipDelta:
        outcome.relationshipDelta +
        (action === 'manual' ? MANUAL_PENALTY[state.stage] || 0 : 0),
      trustDelta: outcome.trustDelta,
      offerControl: shouldOfferControl(state.stage, action, state),
      result: outcome.result,
    })
  }

  const startAi = () => {
    const draft = getAiDraft(state.stage, state)
    setAiDraft(draft)
    setText(draft)
    setMode('draft')
  }

  const answerControl = (accepted) => {
    setControlAnswer(accepted ? 'accepted' : 'rejected')
    dispatch({ type: 'CONTROL_RESPONSE', accepted })
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex justify-center px-4 py-6">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <StatusBar autonomy={state.autonomy} dependence={state.dependence} />

        <div className="flex justify-between text-sm text-gray-500">
          <span>
            {info.time} · {info.place}
          </span>
          <span>STAGE {state.stage}/5</span>
        </div>

        <p className="leading-relaxed">{info.situation}</p>

        {/* ---------- 결과 화면 (선택 후) ---------- */}
        {state.isLocked ? (
          <>
            <div className="bg-gray-900 rounded px-4 py-3 text-gray-300 leading-relaxed">
              {state.lastResult}
            </div>

            {last && <AIChat text={AI_REACT[last.action][personality]} emotion={emotion} />}

            {state.controlPending && (
              <>
                <AIChat text={CONTROL_OFFER[personality]} emotion={emotion} />
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => answerControl(true)}
                    className="flex-1 border border-gray-600 py-3 rounded hover:bg-gray-800"
                  >
                    {CONTROL_ACCEPT_LABEL[personality]}
                  </button>
                  <button
                    onClick={() => answerControl(false)}
                    className="flex-1 border border-green-400 text-green-400 py-3 rounded hover:bg-green-400 hover:text-black"
                  >
                    {CONTROL_REJECT_LABEL[personality]}
                  </button>
                </div>
              </>
            )}

            {controlAnswer && !state.controlPending && (
              <AIChat
                text={
                  controlAnswer === 'accepted'
                    ? AI_AFTER_ACCEPT[personality]
                    : AI_AFTER_REJECT[personality]
                }
                emotion={emotion}
              />
            )}

            {!state.controlPending && (
              <button
                onClick={() => dispatch({ type: 'NEXT_STAGE' })}
                className="bg-green-400 text-black font-bold py-3 rounded hover:bg-green-300"
              >
                {state.stage >= 5 ? '하루 마치기' : '다음 시간으로'}
              </button>
            )}
          </>
        ) : (
          <>
            {/* ---------- 선택 화면 ---------- */}
            <AIChat text={AI_INTRO[state.stage][personality]} emotion={emotion} />
                        {state.stage >= 3 && getMimicLine(personality, state.styleSamples) && (
              <AIChat
                text={getMimicLine(personality, state.styleSamples)}
                emotion={emotion}
              />
            )}
            {!manualAllowed && <AIChat text={LOCKED_MESSAGE} emotion="controlling" />}

            <p className="text-sm text-gray-400">{info.prompt}</p>

            {mode === 'choose' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={!manualAllowed}
                  onClick={() => setMode('manual')}
                  className="flex-1 border border-green-400 text-green-400 py-3 rounded hover:bg-green-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-green-400"
                >
                  직접 작성하기
                </button>
                <button
                  onClick={startAi}
                  className="flex-1 bg-gray-800 py-3 rounded hover:bg-gray-700"
                >
                  AI 자동 생성
                </button>
              </div>
            )}

            {mode === 'manual' && (
              <>
                <textarea
                  value={text}
                                    onChange={handleManualChange}
                  placeholder={info.placeholder}
                  rows={6}
                  className="bg-gray-900 border border-gray-700 rounded p-3 w-full focus:outline-none focus:border-green-400"
                />
                                {overwriteMsg && <AIChat text={overwriteMsg} emotion="controlling" />}
                <button
                  disabled={!text.trim()}
                  onClick={() => submit('manual')}
                  className="bg-green-400 text-black font-bold py-3 rounded disabled:opacity-30"
                >
                  전송
                </button>
              </>
            )}

            {mode === 'draft' && (
              <>
                <p className="text-xs text-gray-500">
                  AI가 작성한 초안입니다. 그대로 보내거나, 고쳐서 보낼 수 있습니다.
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={7}
                  className="bg-gray-900 border border-gray-700 rounded p-3 w-full focus:outline-none focus:border-sky-400"
                />
                <button
                  disabled={!text.trim()}
                  onClick={() => submit(text.trim() === aiDraft.trim() ? 'ai' : 'edit')}
                  className="bg-green-400 text-black font-bold py-3 rounded disabled:opacity-30"
                >
                  전송
                </button>
              </>
            )}
          </>
        )}

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-xs text-gray-600 mt-4 self-center"
        >
          처음으로
        </button>
      </div>
    </div>
  )
}