import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Subscription() {
  const { loggedUser } = useSelector((state) => state.user);
  const packageData = loggedUser?.data?.package;
  const item = packageData?.package;

  const isExpires = new Date() > new Date(packageData?.expires);

  console.log(packageData);

  return (
    <div>
      <h2 className="bg-gray-200 p-2 font-medium text-center">
        SUBSCRIBED PACKAGE
      </h2>

      <div className="mt-4">
        {isExpires && (
          <div className="text-center text-red-500 mb-4">
            Your Package is Expired.{" "}
            <Link to="/packages" className="text-blue-500 underline">
              Subscription Now
            </Link>
          </div>
        )}
        {packageData?.package ? (
          <div className="sm:w-1/2 lg:w-1/3 px-4 py-10 bg-gray-100 rounded">
            <h3 className="text-center text-2xl sm:text-3xl text-neutral font-bold">
              {item?.title}
            </h3>

            <div className="mt-4">
              <p className="text-neutral-content text-xs text-center">
                <del className="text-lg sm:text-xl text-red-500">
                  {item?.price}
                </del>{" "}
                <span className="text-primary text-2xl sm:text-4xl">
                  {parseInt(item?.price - (item?.price * item?.discount) / 100)}
                </span>
                / {item?.type}
              </p>
            </div>

            <ul className="border-t pt-8 mt-8 text-sm sm:text-[15px] text-neutral/80 flex flex-col gap-2">
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
                <p>Paid Model Test (Vendor)</p>
                <p className="rounded-lg bg-pink-600 px-2 text-[11px] text-base-100">
                  {item?.feature?.paidModeltestVendor}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <p>On Demand Test</p>
                <p className="rounded-lg bg-green-500 px-2 text-[11px] text-base-100">
                  {item?.feature?.onDemandtest}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <p>Download Hand-note</p>
                <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
                  {item?.feature?.downloadHandNote}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <p>Download PDF Book</p>
                <p className="rounded-lg bg-green-500 px-2 text-xs text-base-100">
                  {item?.feature?.downloadPdfBook}
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
          </div>
        ) : (
          <div>
            <h3 className="text-center text-neutral">
              No Package Subscribed{" "}
              <Link to="/packages" className="text-blue-500 underline">
                Subscription Now
              </Link>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
