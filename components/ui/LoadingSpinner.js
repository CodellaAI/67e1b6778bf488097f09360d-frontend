
export default function LoadingSpinner({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full border-gray-300 border-t-primary-600 animate-spin`}></div>
  )
}
