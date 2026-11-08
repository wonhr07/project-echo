// 자율성에 따라 화면 위에 노이즈를 씌운다. 글자 가독성은 해치지 않도록 약하게 유지.
export default function GlitchOverlay({ autonomy }) {
  const level = autonomy >= 80 ? 0 : autonomy >= 50 ? 1 : autonomy >= 20 ? 2 : 3
  if (level === 0) return null

  return (
    <div
      className={`glitch-overlay glitch-${level}`}
      aria-hidden="true"
    />
  )
}