import { toast } from "react-toastify";
import {
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} from "../../../Redux/api/packageApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditPackage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [type, setType] = useState();

  const { data, isLoading: getLoading } = useGetSinglePackageQuery(id);
  useEffect(() => {
    if (data?.data) {
      setType(data?.data?.type);
    }
  }, [data]);
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const price = form.price.value;
    const discount = form.discount.value;
    const type = form.type.value;
    const freeModeltest = form.freeModelTest.value;
    const paidModeltest = form.paidModelTest.value;
    const paidModeltestVendor = form.paidModelTestVendor.value;
    const onDemandtest = form.onDemandTest.value;
    const downloadHandNote = form.downloadHandNote.value;
    const askQuestion = form.askQuestion.value;
    const pageView = form.pageView.value;

    const info = {
      title,
      price,
      discount,
      type,
      feature: {
        freeModeltest,
        paidModeltest,
        paidModeltestVendor,
        onDemandtest,
        downloadHandNote,
        askQuestion,
        pageView,
      },
    };

    let res = await updatePackage({ id, info });
    if (res?.data?.success) {
      toast.success("Package edit success");
      navigate("/admin/packages");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  if (getLoading) return "Loading...";

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Package</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={data?.data?.title}
              />
            </div>
            <div>
              <p className="mb-1">Price</p>
              <input
                type="number"
                name="price"
                required
                defaultValue={data?.data?.price}
              />
            </div>
            <div>
              <p className="mb-1">Discount(%)</p>
              <input
                type="number"
                name="discount"
                required
                placeholder="0"
                defaultValue={data?.data?.discount}
              />
            </div>

            <div>
              <p className="mb-1">Type</p>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div>
              <p className="mb-1">Free Model Test</p>
              <input
                type="text"
                name="freeModelTest"
                required
                placeholder="0"
                defaultValue={data?.data?.feature?.freeModeltest}
              />
            </div>
            <div>
              <p className="mb-1">Paid Model Test</p>
              <input
                type="text"
                name="paidModelTest"
                required
                defaultValue={data?.data?.feature?.paidModeltest}
              />
            </div>
            <div>
              <p className="mb-1">Paid Model Test Vendor</p>
              <input
                type="text"
                name="paidModelTestVendor"
                required
                defaultValue={data?.data?.feature?.paidModeltestVendor}
              />
            </div>
            <div>
              <p className="mb-1">On Demand Test</p>
              <input
                type="text"
                name="onDemandTest"
                required
                placeholder="unlimited"
                defaultValue={data?.data?.feature?.onDemandtest}
              />
            </div>
            <div>
              <p className="mb-1">Download Hand-note</p>
              <input
                type="text"
                name="downloadHandNote"
                required
                placeholder="0"
                defaultValue={data?.data?.feature?.downloadHandNote}
              />
            </div>
            <div>
              <p className="mb-1">Ask Question</p>
              <input
                type="text"
                name="askQuestion"
                required
                placeholder="0"
                defaultValue={data?.data?.feature?.askQuestion}
              />
            </div>
            <div>
              <p className="mb-1">Page View</p>
              <input
                type="text"
                name="pageView"
                required
                placeholder="unlimited"
                defaultValue={data?.data?.feature?.pageView}
              />
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Package"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
