function Bar({ label, value, color }) {
  return (
    <div className="flex-1">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function StatusBar({ autonomy, dependence }) {
  return (
    <div className="flex gap-4 w-full">
      <Bar label="자율성" value={autonomy} color="bg-green-400" />
      <Bar label="AI 의존도" value={dependence} color="bg-red-400" />
    </div>
  )
}