import { useReducer, useEffect, useState, useCallback } from 'react'
import { reducer } from './game/reducer.js'
import { initialState } from './game/initialState.js'
import { saveGame, loadGame, clearGame } from './game/storage.js'
import TitleScreen from './components/TitleScreen.jsx'
import StageTransition from './components/StageTransition.jsx'
import GameScreen from './components/GameScreen.jsx'
import EndingScreen from './components/EndingScreen.jsx'
import GlitchOverlay from './components/GlitchOverlay.jsx'
// 앱이 처음 열릴 때 저장 데이터를 한 번만 읽는다
const boot = loadGame()

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [saved] = useState(boot.state)
  const [corrupted] = useState(boot.corrupted)

  // 상태가 바뀔 때마다 저장 (타이틀 화면은 저장하지 않음)
  useEffect(() => {
    if (state.screen !== 'title') saveGame(state)
  }, [state])

  const handleStart = () => {
    clearGame()
    dispatch({ type: 'START_GAME' })
  }

  const handleContinue = () => dispatch({ type: 'RESTORE', state: saved })

  const handleBegin = useCallback(() => dispatch({ type: 'BEGIN_STAGE' }), [])

  if (state.screen === 'title') {
    return (
      <TitleScreen
        onStart={handleStart}
        onContinue={handleContinue}
        hasSave={!!saved}
        corrupted={corrupted}
      />
    )
  }

  if (state.screen === 'transition') {
    return <StageTransition stage={state.stage} onDone={handleBegin} />
  }

     if (state.screen === 'play') {
    return (
      <>
        <GameScreen key={state.stage} state={state} dispatch={dispatch} />
        <GlitchOverlay autonomy={state.autonomy} />
      </>
    )
  }

  return <EndingScreen state={state} dispatch={dispatch} />
} 