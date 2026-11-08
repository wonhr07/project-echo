// 엔딩 판정: 위에 있는 조건이 먼저 적용됩니다.
export function decideEnding(s) {
  const last = s.choiceHistory[s.choiceHistory.length - 1]
  const finalManual = !!last && last.stage === 5 && last.action === 'manual'

  if (s.autonomy <= 20 && s.dependence >= 80) return 'substitute'
  if (s.dependence >= 80 && s.controlAccepted >= 3) return 'truman'
  if (
    s.autonomy >= 70 &&
    s.controlRejected >= 1 &&
    s.relationship >= 60 &&
    finalManual
  )
    return 'humanity'
   if (s.autonomy >= 70 && s.dependence <= 30 && s.relationship < 60)
    return 'analog'
  return 'ghost' // 나머지는 모두 여기로 (모든 플레이가 엔딩에 도달)
}