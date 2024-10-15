export default function FeedbackSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="grid grid-cols-3 gap-4 items-center bg-base-100 rounded p-4">
        <div className="flex flex-col justify-center items-center">
          <div className="w-28 h-28 rounded-full bg-gray-100"></div>
          <div className="mt-2 bg-gray-100 w-32 mx-auto h-3 rounded"></div>
        </div>

        <div className="col-span-2">
          <div className="bg-gray-100 w-[80%] h-3 rounded"></div>
          <div className="bg-gray-100 w-[20%] h-3 rounded my-2"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 rounded"></div>
            <div className="bg-gray-100 h-2 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
