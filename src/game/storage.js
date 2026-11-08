const KEY = 'project-echo-save'

export function saveGame(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // 저장 실패해도 게임은 계속 진행
  }
}

// 저장 데이터가 정상인지 검사
function isValid(s) {
  if (!s || typeof s !== 'object') return false
  const nums = ['autonomy', 'dependence', 'trust', 'relationship']
  for (const k of nums) {
    if (typeof s[k] !== 'number' || s[k] < 0 || s[k] > 100) return false
  }
  if (!Number.isInteger(s.stage) || s.stage < 1 || s.stage > 5) return false
  if (!Array.isArray(s.choiceHistory) || !Array.isArray(s.styleSamples)) return false
  return ['title', 'play', 'transition', 'ending'].includes(s.screen)
}

// 반환: { state, corrupted }
export function loadGame() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { state: null, corrupted: false }
    const parsed = JSON.parse(raw)
    if (!isValid(parsed)) return { state: null, corrupted: true }
    return { state: parsed, corrupted: false }
  } catch {
    return { state: null, corrupted: true }
  }
}

export function clearGame() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // 무시
  }
}