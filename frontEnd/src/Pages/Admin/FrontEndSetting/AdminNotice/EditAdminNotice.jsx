import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSingleAdminNoticeQuery,
  useUpdateAdminNoticeMutation,
} from "../../../../Redux/api/adminNoticeApi";

export default function EditAdminNotice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleAdminNoticeQuery(id);
  const faq = data?.data;

  const [updateAdminNotice, { isLoading }] = useUpdateAdminNoticeMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const link = form.link.value;

    const info = {
      title,
      description,
      link,
    };

    let res = await updateAdminNotice({ id, info });
    if (res?.data?.success) {
      toast.success("Notice edit success");
      navigate("/admin/front-end/admin-notice/all");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Notice</h2>

        <form onSubmit={handleUpdate} className="p-4 md:w-3/4 mx-auto">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={faq?.title}
              />
            </div>
            <div>
              <p className="mb-1">Description</p>
              <textarea
                name="description"
                rows={6}
                required
                defaultValue={faq?.description}
              ></textarea>
            </div>
            <div>
              <p className="mb-1">Link</p>
              <input
                type="text"
                name="link"
                required
                defaultValue={faq?.link}
              />
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
