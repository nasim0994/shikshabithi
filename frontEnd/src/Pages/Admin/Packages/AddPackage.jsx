import { toast } from "react-toastify";
import { useAddPackageMutation } from "../../../Redux/api/packageApi";
import { useNavigate } from "react-router-dom";

export default function AddPackage() {
  const navigate = useNavigate();
  const [addPackage, { isLoading }] = useAddPackageMutation();

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
    const downloadPdfBook = form.downloadPdfBook.value;
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
        downloadPdfBook,
        pageView,
      },
    };

    let res = await addPackage(info);
    if (res?.data?.success) {
      toast.success("Package add success");
      navigate("/admin/packages");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Package</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" required />
            </div>
            <div>
              <p className="mb-1">Price</p>
              <input type="number" name="price" required />
            </div>
            <div>
              <p className="mb-1">Discount(%)</p>
              <input type="number" name="discount" required placeholder="0" />
            </div>

            <div>
              <p className="mb-1">Type</p>
              <select name="type">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <p className="mb-1 whitespace-nowrap">Free Model Test</p>
              <input
                type="text"
                name="freeModelTest"
                required
                placeholder="0"
                className="w-max"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="mb-1">Paid Model Test</p>
              <input
                type="text"
                name="paidModelTest"
                required
                className="w-max"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="mb-1">Paid Model Test Vendor</p>
              <input
                type="text"
                name="paidModelTestVendor"
                required
                className="w-max"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="mb-1">On Demand Test</p>
              <input
                type="text"
                name="onDemandTest"
                required
                placeholder="unlimited"
                className="w-max"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="mb-1">Download Hand-note</p>
              <input
                type="text"
                name="downloadHandNote"
                required
                placeholder="0"
                className="w-max"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="mb-1">Download PDF Book</p>
              <input
                type="text"
                name="downloadPdfBook"
                required
                placeholder="0"
                className="w-max"
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="mb-1">Page View</p>
              <input
                type="text"
                name="pageView"
                required
                placeholder="unlimited"
                className="w-max"
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
