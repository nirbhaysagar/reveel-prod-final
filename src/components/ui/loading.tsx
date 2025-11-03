export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-2xl h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-200 rounded-2xl h-4 w-1/2"></div>
    </div>
  )
}
