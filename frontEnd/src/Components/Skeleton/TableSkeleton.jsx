export default function TableSkeleton() {
  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3 border-b">
        <div className="bg-gray-100 h-3 rounded w-28"></div>
        <div className="bg-gray-100 h-4 rounded w-28"></div>
      </div>

      <div>
        <div className="bg-base-100 h-8 border-b"></div>
        <div className="bg-gray-100 h-8 border-b"></div>
        <div className="bg-base-100 h-8 border-b"></div>
        <div className="bg-gray-100 h-8 border-b"></div>
        <div className="bg-base-100 h-8 border-b"></div>
        <div className="bg-gray-100 h-8 border-b"></div>
        <div className="bg-base-100 h-8 border-b"></div>
        <div className="bg-gray-100 h-8 border-b"></div>
        <div className="bg-base-100 h-8 border-b"></div>
        <div className="bg-gray-100 h-8 border-b"></div>
        <div className="bg-base-100 h-8 border-b"></div>
        <div className="bg-gray-100 h-8 border-b"></div>
      </div>
    </div>
  );
}
