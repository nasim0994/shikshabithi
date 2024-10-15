export default function AcademySkeleton() {
  return (
    <div className="mt-2 grid md:grid-cols-3 items-start gap-6">
      <div className="md:col-span-2 rounded overflow-hidden shadow">
        <div className="bg-base-100 py-8 rounded mb-4">
          <div className="bg-gray-100 h-3 w-36 rounded mx-auto"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-28 rounded bg-base-100 border-b p-3">
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 mt-2 w-28 rounded"></div>
          </div>
          <div className="h-28 rounded bg-base-100 border-b p-3">
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 mt-2 w-28 rounded"></div>
          </div>
          <div className="h-28 rounded bg-base-100 border-b p-3">
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 mt-2 w-28 rounded"></div>
          </div>
          <div className="h-28 rounded bg-base-100 border-b p-3">
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 mt-2 w-28 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
