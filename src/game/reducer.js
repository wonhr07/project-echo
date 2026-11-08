import { initialState } from './initialState.js'
import { decideEnding } from './endings.js'

const clamp = (v) => Math.max(0, Math.min(100, v))

// 기획서의 수치 변화표
export const DELTAS = {
  manual: { autonomy: 5, dependence: 0 }, // 직접 작성
  ai: { autonomy: -10, dependence: 10 }, // AI 생성 사용
  edit: { autonomy: 3, dependence: 5 }, // AI 결과 직접 수정
  accept: { autonomy: -10, dependence: 10 }, // 통제 수락
  reject: { autonomy: 10, dependence: -5 }, // 통제 거부
}

export function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, screen: 'play' }

    case 'CHOOSE': {
      if (state.screen !== 'play' || state.isLocked) return state
      const d = DELTAS[action.action]
      if (!d) return state

      const text = (action.text || '').slice(0, 100)
      const keepsText = action.action === 'manual' || action.action === 'edit'
      const styleSamples =
        keepsText && text
          ? [...state.styleSamples, text].slice(-5)
          : state.styleSamples

      return {
        ...state,
        autonomy: clamp(state.autonomy + d.autonomy),
        dependence: clamp(state.dependence + d.dependence),
        relationship: clamp(state.relationship + (action.relationshipDelta || 0)),
        trust: clamp(state.trust + (action.trustDelta || 0)),
        choiceHistory: [
          ...state.choiceHistory,
          { stage: state.stage, action: action.action, text },
        ],
        styleSamples,
        controlPending: !!action.offerControl,
                isLocked: true,
        lastResult: action.result || '',
      }
    }

    case 'CONTROL_RESPONSE': {
      if (!state.controlPending) return state
      const d = action.accepted ? DELTAS.accept : DELTAS.reject
      return {
        ...state,
        autonomy: clamp(state.autonomy + d.autonomy),
        dependence: clamp(state.dependence + d.dependence),
        controlAccepted: state.controlAccepted + (action.accepted ? 1 : 0),
        controlRejected: state.controlRejected + (action.accepted ? 0 : 1),
        controlPending: false,
      }
    }

    case 'NEXT_STAGE': {
      if (!state.isLocked || state.controlPending) return state
      if (state.stage >= 5) {
        return { ...state, screen: 'ending', ending: decideEnding(state) }
      }
      return {
        ...state,
        stage: state.stage + 1,
        screen: 'transition',
                screen: 'transition',
        isLocked: false,
        lastResult: '',
      }
    }

    case 'BEGIN_STAGE':
      return { ...state, screen: 'play' }

    case 'RESTORE':
      return action.state

    case 'RESET':
      return initialState

    default:
      return state
  }
}