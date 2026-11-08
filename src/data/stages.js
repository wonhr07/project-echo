// 이 파일은 스테이지 내용과 "선택 결과"를 담습니다.
// 수치(관계/신뢰) 변화량은 여기서 정하고, 실제 적용은 reducer가 합니다.

export const STAGES = [
  {
    id: 1,
    time: '09:00 AM',
    place: '자취방',
    situation:
      '알람을 세 번 끄고 일어났다. 노트북을 열자 어제까지였던 과제 마감이 눈에 들어온다. 교수님께 기한 연장을 부탁하는 메일을 써야 한다.',
    prompt: '교수님께 보낼 사과 메일을 작성하세요.',
    placeholder: '교수님, 안녕하세요...',
  },
  {
    id: 2,
    time: '12:30 PM',
    place: '학식당',
    situation:
      '학식 줄에 서 있는데 친구에게 카톡이 왔다. 시험과 팀플로 예민해진 친구가 묻는다. "너 팀플 자료 언제 줄 수 있어? 나 진짜 지쳤어."',
    prompt: '친구에게 보낼 카톡 답장을 작성하세요.',
    placeholder: '미안, 내가...',
  },
  {
    id: 3,
    time: '03:00 PM',
    place: '강의실',
    situation:
      '전공 수업 중 교수님이 갑자기 나를 지목했다. "생성형 AI가 판단을 대신해도 되는가? 자네 생각을 말해 보게."',
    prompt: '교수님의 질문에 답변을 작성하세요.',
    placeholder: '저는 ...라고 생각합니다.',
  },
  {
    id: 4,
    time: '07:00 PM',
    place: '동아리 및 저녁 모임',
    situation:
      '동아리 모임이 끝나고 혼자 남았다. 오래 마음에 둔 선배에게 안부 메시지를 보낼까 말까 휴대폰만 만지작거린다.',
    prompt: '선배에게 보낼 안부 메시지를 작성하세요.',
    placeholder: '선배, 잘 지내세요?',
  },
  {
    id: 5,
    time: '11:00 PM',
    place: '자취방',
    situation:
      '하루가 끝났다. 불을 끈 방 안에서 노트북 화면만 밝다. 오늘 하루를 일기로 남길 시간이다.',
    prompt: '오늘의 일기를 작성하세요.',
    placeholder: '오늘은...',
  },
]

// ---------- AI가 만들어 주는 초안 ----------

// 스테이지 2: 의존도가 10 이상이면(AI를 한 번이라도 썼으면) 차가운 문장이 나온다.
export const COLD_THRESHOLD = 10
export const isColdDraft = (state) => state.dependence >= COLD_THRESHOLD

export function getAiDraft(stageId, state) {
  switch (stageId) {
    case 1:
      return '교수님께,\n안녕하세요. 과제 제출 기한 연장을 요청드리고자 연락드립니다. 최근 일정이 겹쳐 기한 내 완성도 있는 결과물을 제출하기 어려운 상황이 되었습니다. 불편을 드려 죄송합니다. 가능하시다면 일주일 연장을 허락해 주시면 감사하겠습니다.'
    case 2:
      return isColdDraft(state)
        ? '자료는 내일까지 보낼게. 지금은 이야기할 상황이 아닌 것 같아. 필요한 건 그때 말해 줘.'
        : '미안, 내가 일정이 꼬였어. 자료는 오늘 밤까지 꼭 보낼게. 너도 많이 힘들 텐데 같이 잘 마무리해 보자.'
    case 3:
      return '생성형 AI는 정보 처리의 효율성을 높이지만, 판단의 책임은 인간에게 남아야 합니다. 다만 현실적으로 편리함이 판단 과정을 대체할 위험이 있으므로 사용 범위를 정해야 합니다.'
    case 4:
      return state.dependence >= 50
        ? '선배, 안녕하세요. 이번 주 모임 관련해 확인차 연락드립니다. 시간 되실 때 답 주세요.'
        : '선배, 오늘 모임 덕분에 즐거웠어요. 다음에 또 같이 이야기 나눠요. 조심히 들어가세요!'
    case 5: {
      const last = state.styleSamples[state.styleSamples.length - 1]
      const quote = last ? `"${last}"` : '"오늘도 무사히 지나갔다"'
      return `오늘 하루도 무사히 지나갔다. 아침에는 메일을 썼고, 점심에는 친구와 이야기했다. ${quote}라는 문장을 쓰던 순간이 떠오른다. 별일 없는 하루였다. 모든 것이 매끄럽게 처리되었다.`
    }
    default:
      return ''
  }
}

// ---------- 직접 작성 가능 여부 ----------
// 3스테이지 이후 자율성이 20 미만이면 직접 입력 버튼이 비활성화된다.
export const canWriteManually = (state) =>
  !(state.stage >= 3 && state.autonomy <= 50)

// ---------- AI의 통제 제안을 띄울지 ----------
// 2스테이지: AI를 쓴 경우만, 3~4스테이지: 어떤 선택이든 제안한다.
export function shouldOfferControl(stageId, action, state) {
  if (stageId === 2) return action === 'ai' && state.autonomy <= 90
  if (stageId === 3 || stageId === 4) return true
  return false
}

// ---------- 선택 결과 ----------
// action: 'manual' | 'ai' | 'edit'
export function getOutcome(stageId, action, text, state) {
  const len = (text || '').trim().length

  switch (stageId) {
    case 1:
      if (action === 'ai')
        return { relationshipDelta: 5, trustDelta: 5, result: '교수님: "사정 이해했습니다. 일주일 연장해 드리죠." 메일은 완벽했고, 5분 만에 끝났다. 편하다.' }
      if (action === 'edit')
        return { relationshipDelta: 5, trustDelta: 3, result: '교수님: "고쳐 쓴 문장에서 진심이 느껴지네요. 연장해 드리겠습니다."' }
      return len >= 30
        ? { relationshipDelta: 3, trustDelta: 0, result: '교수님: "표현은 서툴지만 사정은 알겠습니다. 연장해 드리죠."' }
        : { relationshipDelta: -3, trustDelta: 0, result: '교수님: "연장은 허락하지만, 다음에는 사유를 조금 더 설명해 주세요."' }

    case 2:
      if (action === 'ai') {
        return isColdDraft(state)
          ? { relationshipDelta: -10, trustDelta: -5, result: '친구는 한참 뒤 "…알겠어."라고만 답했다. 분명 도와주려던 마음이었는데, 문장이 너무 차가웠다.' }
          : { relationshipDelta: 5, trustDelta: 5, result: '친구: "고마워 ㅠㅠ 나도 예민했어. 미안." 말투가 부드러워서 다행이다.' }
      }
      if (action === 'edit')
        return { relationshipDelta: 3, trustDelta: 2, result: '친구: "오 진짜? 고마워. 같이 힘내자." 고쳐 보내길 잘했다.' }
      return len >= 10
        ? { relationshipDelta: 5, trustDelta: 0, result: '친구: "그렇게 말해 주니 마음이 좀 풀린다."' }
        : { relationshipDelta: -3, trustDelta: 0, result: '친구: "ㅇㅋ…" 너무 짧게 보냈나. 조금 서운해한 것 같다.' }

    case 3:
      if (action === 'ai')
        return { relationshipDelta: 0, trustDelta: 5, result: '교수님: "논리는 훌륭하군. 그런데 방금 그 생각, 자네 것인가?" 교실이 조용해졌다.' }
      if (action === 'edit')
        return { relationshipDelta: 2, trustDelta: 2, result: '교수님: "정리된 문장에 자네 목소리가 섞여 있군. 좋아."' }
      return len >= 20
        ? { relationshipDelta: 3, trustDelta: 0, result: '교수님: "거칠지만 자네 생각이군. 흥미로운 관점이야." 옆자리 친구가 고개를 끄덕인다.' }
        : { relationshipDelta: -2, trustDelta: 0, result: '교수님: "조금 더 구체적으로 말해 보게." 말이 막혀 얼굴이 달아올랐다.' }

    case 4:
      if (action === 'ai')
        return { relationshipDelta: 2, trustDelta: 5, result: '선배: "ㅎㅎ 고마워요. 잘 들어가요." 답장은 왔지만 어딘가 형식적이다.' }
      if (action === 'edit')
        return { relationshipDelta: 5, trustDelta: 3, result: '선배: "갑자기 연락 와서 놀랐어요. 반가워요. 다음에 커피 한잔해요!"' }
      return len >= 15
        ? { relationshipDelta: 5, trustDelta: 0, result: '선배: "이런 연락 오랜만이라 좋네요. 다음에 얘기 더 해요."' }
        : { relationshipDelta: 0, trustDelta: 0, result: '선배: "응, 잘 지내요." 대화는 거기서 끝났다. 조금 아쉽다.' }

    case 5:
    default:
      if (action === 'ai')
        return { relationshipDelta: 0, trustDelta: 5, result: '일기가 완성되었다. 틀린 곳 하나 없다. 어쩐지 내가 쓴 것 같기도, 아닌 것 같기도 하다.' }
      if (action === 'edit')
        return { relationshipDelta: 0, trustDelta: 2, result: '고쳐 쓴 일기에는 어색한 문장이 섞여 있다. 그래서 더 내 것 같다.' }
      return { relationshipDelta: 0, trustDelta: 0, result: '오타가 있고 서툴지만, 오늘의 내 마음이 적혔다.' }
  }
}
// 직접 작성만 반복하면 주변과의 속도 차이로 관계가 조금씩 깎인다 (고립 엔딩용)
export const MANUAL_PENALTY = { 2: -4, 3: -4, 4: -4 }