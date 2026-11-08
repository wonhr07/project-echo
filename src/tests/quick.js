import { initialState } from '../game/initialState.js'
import { reducer } from '../game/reducer.js'

function play(plan) {
  let s = reducer(initialState, { type: 'START_GAME' })
  for (const step of plan) {
    s = reducer(s, {
      type: 'CHOOSE',
      action: step.action,
      text: '테스트 문장',
      offerControl: step.accept !== undefined,
      relationshipDelta: step.rel ?? 0,
    })
    if (step.accept !== undefined) {
      s = reducer(s, { type: 'CONTROL_RESPONSE', accepted: step.accept })
    }
    s = reducer(s, { type: 'NEXT_STAGE' })
    if (s.screen === 'transition') s = reducer(s, { type: 'BEGIN_STAGE' })
  }
  return s
}

const cases = [
  ['substitute (기대)', Array(5).fill({ action: 'ai', accept: true })],
  ['truman (기대)', [
    ...Array(4).fill({ action: 'ai', accept: true }),
    { action: 'manual' },
  ]],
  ['humanity (기대)', [
    { action: 'manual' }, { action: 'manual' },
    { action: 'manual', accept: false },
    { action: 'manual' }, { action: 'manual' },
  ]],
  ['analog (기대)', [
    { action: 'manual', rel: -15 }, { action: 'manual', rel: -15 },
    { action: 'manual' }, { action: 'manual' }, { action: 'manual' },
  ]],
  ['ghost (기대)', [
    { action: 'ai' }, { action: 'ai' }, { action: 'ai' },
    { action: 'edit' }, { action: 'manual' },
  ]],
]

for (const [name, plan] of cases) {
  const s = play(plan)
  console.log(
    name.padEnd(20),
    '→', s.ending.padEnd(10),
    `자율성 ${s.autonomy} / 의존도 ${s.dependence} / 관계 ${s.relationship}`
  )
}