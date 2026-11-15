export default function Loading() {
  return (
    <div className="grid gap-8 md:grid-cols-2 animate-pulse">
      <div className="h-80 bg-gray-300 rounded-lg" />
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded w-2/3" />
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
      </div>
    </div>
  );
}
