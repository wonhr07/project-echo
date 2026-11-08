import { STAGES, getAiDraft, getOutcome, shouldOfferControl, canWriteManually } from '../data/stages.js'
import { AI_INTRO } from '../data/aiLines.js'
import { getPersonality } from '../game/personality.js'
import { initialState } from '../game/initialState.js'

console.log('스테이지 수:', STAGES.length)

for (const st of STAGES) {
  for (const p of ['helper', 'nudging', 'controlling', 'commanding']) {
    if (!AI_INTRO[st.id][p]) console.log('대사 누락:', st.id, p)
  }
}

const s2 = { ...initialState, stage: 2, dependence: 10, autonomy: 90 }
console.log('2스테이지 AI 초안:', getAiDraft(2, s2))
console.log('2스테이지 결과:', getOutcome(2, 'ai', '', s2).result)
console.log('통제 제안(2, ai):', shouldOfferControl(2, 'ai', s2))
console.log('직접입력 가능(자율성 10, 3단계):', canWriteManually({ stage: 3, autonomy: 10 }))
console.log('성격(15):', getPersonality(15))
console.log('완료: 위에 오류가 없으면 정상입니다.')