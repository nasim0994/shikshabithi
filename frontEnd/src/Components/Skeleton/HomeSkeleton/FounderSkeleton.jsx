export default function FounderSkeleton() {
  return (
    <div className="py-5 sm:py-10">
      <div className="container p-5 bg-base-100 shadow rounded">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="w-40 sm:w-56 h-40 sm:h-56 mx-auto rounded-full bg-gray-100"></div>
          <div className="md:col-span-2">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
              <div className="bg-gray-100 h-2"></div>
            </div>

            <div className="mt-4 bg-gray-100 h-4 w-40 rounded"></div>
            <div className="mt-4 flex gap-3">
              <div className="bg-gray-100 h-8 w-8 rounded-full"></div>
              <div className="bg-gray-100 h-8 w-8 rounded-full"></div>
              <div className="bg-gray-100 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
