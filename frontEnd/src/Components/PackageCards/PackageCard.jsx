import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function PackageCard({ item }) {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  return (
    <div className="px-4 py-10 bg-gray-100 rounded">
      <h3 className="text-center text-2xl sm:text-3xl text-neutral font-bold">
        {item?.title}
      </h3>

      <div className="mt-4">
        <p className="text-neutral-content text-xs text-center">
          <del className="text-lg sm:text-xl text-red-500">{item?.price}</del>{" "}
          <span className="text-primary text-2xl sm:text-4xl">
            {parseInt(item?.price - (item?.price * item?.discount) / 100)}
          </span>
          / {item?.type}
        </p>
      </div>

      <ul className="border-t pt-8 mt-8 text-sm sm:text-[15px] text-neutral/80 flex flex-col gap-2">
        <li className="flex justify-between items-center">
          <p>On Demand Test</p>
          <p className="rounded-lg bg-green-500 px-2 text-[11px] text-base-100">
            {item?.feature?.onDemandtest}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Free Model Test</p>
          <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
            {item?.feature?.freeModeltest}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Paid Model Test</p>
          <p className="rounded-lg bg-green-500 px-2 text-xs text-base-100">
            {item?.feature?.paidModeltest}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Add Model Test (vendor)</p>
          <p className="rounded-lg bg-pink-600 px-2 text-[11px] text-base-100">
            {item?.feature?.paidModeltestVendor}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Download Hand-note</p>
          <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
            {item?.feature?.downloadHandNote}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Ask Question</p>
          <p className="rounded-lg bg-green-500 px-2 text-xs text-base-100">
            {item?.feature?.askQuestion}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Page View</p>
          <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
            {item?.feature?.pageView}
          </p>
        </li>

        <li className="flex justify-between items-center">
          <p>Ad Free Content</p>
          <p className="rounded-full bg-red-500 p-1 text-[11px] text-base-100">
            <IoClose />
          </p>
        </li>
      </ul>

      <div className="mt-10 text-center text-xs">
        {user?._id ? (
          <Link
            to={`/package/checkout/${item?._id}`}
            className="bg-primary px-6 py-2 rounded text-base-100"
          >
            Purchase Now
          </Link>
        ) : (
          <>
            <p className="text-neutral-content">
              To Purchase a Package, please
            </p>
            <Link
              to={`/package/checkout/${item?._id}`}
              className="bg-primary px-6 py-2 rounded text-base-100 mt-2 block w-max mx-auto"
            >
              Login Now
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
