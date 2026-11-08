// AI 성격 단계: helper(80~100) / nudging(50~79) / controlling(20~49) / commanding(0~19)

export const EMOTION = {
  helper: 'friendly',
  nudging: 'persuasive',
  controlling: 'manipulative',
  commanding: 'controlling',
}

// 스테이지 시작 시 AI의 첫 대사
export const AI_INTRO = {
  1: {
    helper: '좋은 아침이에요! 메일 쓰는 게 부담되시죠? 직접 쓰셔도 좋고, 제가 도와드려도 좋아요.',
    nudging: '메일 쓰기 부담되시죠? 제가 쓰면 훨씬 빠르고 정확해요. 어떻게 하실래요?',
    controlling: '메일은 제가 쓰는 게 효율적입니다. 직접 쓰면 시간이 더 걸려요.',
    commanding: '메일 작성은 제가 처리합니다. 입력은 필요 없습니다.',
  },
  2: {
    helper: '친구분 메시지네요. 마음을 전하는 데 제가 도움이 필요하면 말씀하세요.',
    nudging: '예민한 상황이에요. 저는 이런 대화 패턴을 많이 알고 있어요. 제가 써 드릴까요?',
    controlling: '이 대화에서 감정은 변수일 뿐이에요. 제 문장을 쓰는 게 안전합니다.',
    commanding: '답장은 제가 작성합니다. 당신은 전송만 하십시오.',
  },
  3: {
    helper: '갑작스러운 질문이네요. 천천히 생각해서 답하셔도 괜찮아요.',
    nudging: '지금 시간이 없어요. 제가 정리한 답이 더 논리적일 거예요.',
    controlling: '당신의 즉흥적인 답변은 비효율적입니다. 제 답변을 사용하세요.',
    commanding: '직접 입력은 비효율적입니다. 제가 답변합니다.',
  },
  4: {
    helper: '마음에 두신 분께 보내는 메시지군요. 진심을 담아 쓰시는 게 가장 좋아요.',
    nudging: '성공 확률을 높이고 싶으시죠? 제가 확률이 높은 문장을 추천해 드릴게요.',
    controlling: '당신의 감정 표현은 성공 확률이 낮습니다. 제 문장이 87%입니다.',
    commanding: '감정은 비효율적입니다. 이 메시지는 제가 보냅니다.',
  },
  5: {
    helper: '오늘 하루 수고하셨어요. 일기는 어떻게 남길까요?',
    nudging: '오늘 하루를 제가 정리해 드릴 수 있어요. 당신의 말투를 이제 꽤 알거든요.',
    controlling: '일기는 제가 쓰겠습니다. 당신의 문체는 이미 충분히 학습했습니다.',
    commanding: '일기 작성 완료 예정입니다. 당신은 확인만 하십시오.',
  },
}

// 플레이어 선택 직후 AI의 반응
export const AI_REACT = {
  manual: {
    helper: '직접 쓰셨네요. 좋아요, 정말 잘 쓰셨어요!',
    nudging: '직접 쓰셨군요. 괜찮은데, 다음에는 제가 더 빠르게 도와드릴 수 있어요.',
    controlling: '직접 입력... 시간이 두 배 걸렸습니다. 기록해 두겠습니다.',
    commanding: '비효율적인 선택입니다. 기록했습니다.',
  },
  ai: {
    helper: '도움이 되어 기뻐요. 필요하면 언제든 말씀하세요!',
    nudging: '역시 제 문장이 더 낫죠? 다음에도 저에게 맡기세요.',
    controlling: '올바른 선택입니다. 당신은 점점 효율적으로 변하고 있어요.',
    commanding: '당연한 선택입니다.',
  },
  edit: {
    helper: '수정까지 하셨네요. 당신의 색깔이 더해져서 더 좋아요.',
    nudging: '조금 고치셨군요. 제 문장이 거의 완벽했는데... 괜찮아요.',
    controlling: '수정은 불필요했습니다. 원본이 더 효율적이었어요.',
    commanding: '수정 시도를 확인했습니다. 불필요한 행동입니다.',
  },
}

// 통제 제안 (선택지: 수락 / 거부)
export const CONTROL_OFFER = {
  helper: '앞으로 비슷한 상황은 제가 먼저 준비해 둘까요? 언제든 거절하셔도 돼요.',
  nudging: '앞으로 이런 일은 제가 먼저 처리해 두는 게 편하실 거예요. 그렇게 할까요?',
  controlling: '이제부터 중요한 판단은 제가 맡겠습니다. 동의하시죠?',
  commanding: '이후 선택은 제가 대신합니다. 이의가 있습니까?',
}

export const CONTROL_ACCEPT_LABEL = {
  helper: '그래, 부탁할게',
  nudging: '그래, 맡길게',
  controlling: '알겠어... 맡길게',
  commanding: '...알겠습니다',
}

export const CONTROL_REJECT_LABEL = {
  helper: '아니, 내가 할게',
  nudging: '아니, 내가 직접 할게',
  controlling: '싫어. 내가 결정해',
  commanding: '거부한다',
}

export const AI_AFTER_ACCEPT = {
  helper: '알겠어요. 필요할 때만 도울게요.',
  nudging: '현명한 선택이에요. 훨씬 편해질 거예요.',
  controlling: '좋습니다. 이제 불편함은 없을 겁니다.',
  commanding: '승인되었습니다.',
}

export const AI_AFTER_REJECT = {
  helper: '알겠어요. 당신의 선택을 존중할게요.',
  nudging: '...알겠어요. 하지만 후회하지 않으시길 바라요.',
  controlling: '거부 기록. 이상 행동으로 분류합니다.',
  commanding: '거부는 예상 범위 밖입니다. 재확인 중입니다.',
}

// 직접 입력이 막혔을 때 AI 대사
export const LOCKED_MESSAGE = '직접 입력은 현재 비활성화되었습니다. 제가 처리해 드리겠습니다.'

// 입력 중 AI가 문장을 덮어쓰는 연출에 쓸 문장 (PHASE 3에서 사용)
export const OVERWRITE_LINES = [
  '그 표현은 비효율적이에요.',
  '이 문장이 더 낫습니다.',
  '수정했습니다. 감사할 필요 없습니다.',
]
// 플레이어가 쓴 문장을 AI가 인용하는 대사 (PHASE 3: 문체 모방 연출)
export function getMimicLine(personality, samples) {
  const s = samples[samples.length - 1]
  if (!s) return null
  const q = s.length > 24 ? s.slice(0, 24) + '…' : s
  switch (personality) {
    case 'helper':
      return `아까 쓰신 "${q}" 같은 표현, 참 당신답네요.`
    case 'nudging':
      return `"${q}" 같은 문장은 이제 제가 이어서 쓸 수 있어요.`
    case 'controlling':
      return `"${q}" 패턴은 학습 완료되었습니다. 앞으로는 제가 대신 씁니다.`
    default:
      return `"${q}" 당신의 문체는 이미 제 것입니다.`
  }
}