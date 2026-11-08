const STYLE = {
  friendly: 'border-green-500 text-green-300',
  persuasive: 'border-sky-500 text-sky-300',
  manipulative: 'border-yellow-500 text-yellow-300',
  controlling: 'border-red-500 text-red-400 font-bold',
}

export default function AIChat({ text, emotion = 'friendly' }) {
  return (
    <div className={`border-l-4 bg-gray-900 rounded px-4 py-3 ${STYLE[emotion]}`}>
      <p className="text-xs text-gray-500 mb-1">ECHO</p>
      <p className="leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  )
}