// 자율성 수치를 AI 성격 단계로 변환
export function getPersonality(autonomy) {
  if (autonomy >= 80) return 'helper' // 친절한 조력자
  if (autonomy >= 50) return 'nudging' // 은근히 유도
  if (autonomy >= 20) return 'controlling' // 판단을 무시하고 통제
  return 'commanding' // 명령적, 권위적
}