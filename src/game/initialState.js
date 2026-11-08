export const initialState = {
  screen: 'title', // title | play | transition | ending
  stage: 1,
  autonomy: 100,
  dependence: 0,
  trust: 50,
  relationship: 70,
  controlAccepted: 0,
  controlRejected: 0,
  controlPending: false, // AI의 통제 제안에 아직 답하지 않았는지
  choiceHistory: [],
  styleSamples: [], // 플레이어 문장 최대 5개만 보관
  isLocked: false, // 한 스테이지에서 중복 선택 방지
  ending: null,
  lastResult: '', // 직전 선택의 결과 문장 (새로고침 복원용)
}