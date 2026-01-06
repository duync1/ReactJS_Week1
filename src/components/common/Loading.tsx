interface LoadingProps {
  message?: string
  color?: 'blue' | 'purple' | 'green' | 'orange'
}

const Loading = ({ message = 'Loading...', color = 'blue' }: LoadingProps) => {
  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    orange: 'border-orange-500',
  }

  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-700 font-semibold">
        <span
          className={`h-10 w-10 animate-spin rounded-full border-4 ${colorClasses[color]} border-t-transparent shadow-sm`}
        />
        <span className="text-sm tracking-wide">{message}</span>
      </div>
    </div>
  )
}

export default Loading
