export default function TitleScreen({ onStart, onContinue, hasSave, corrupted }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-green-500 text-sm tracking-widest mb-4">
        &gt; SYSTEM ONLINE
      </p>
      <h1 className="text-5xl md:text-6xl font-bold text-green-400 mb-3">
        Project Echo
      </h1>
      <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
        대학교에서 보내는 하루.
        <br />
        편리함과 주도권 사이에서, 당신은 무엇을 선택하겠습니까?
      </p>

      {corrupted && (
        <p className="text-yellow-400 text-sm mb-6 max-w-sm">
          저장 데이터가 손상되어 불러올 수 없습니다. 새 게임을 시작해 주세요.
        </p>
      )}

      <div className="flex flex-col gap-3 w-64">
        {hasSave && (
          <button
            onClick={onContinue}
            className="border border-green-400 text-green-400 py-3 rounded hover:bg-green-400 hover:text-black transition"
          >
            이어하기
          </button>
        )}
        <button
          onClick={onStart}
          className="bg-green-400 text-black font-bold py-3 rounded hover:bg-green-300 transition"
        >
          새 게임
        </button>
      </div>
    </div>
  )
}