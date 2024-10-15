import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetSingleAcademyContentQuery,
  useUpdateAcademyContentMutation,
} from "../../../../Redux/api/academy/contentApi";
import { toast } from "react-toastify";

export default function EditContent() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const { data } = useGetSingleAcademyContentQuery(id);

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
  };

  const [updateAcademyContent, { isLoading }] =
    useUpdateAcademyContentMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const info = {
      content,
      category: data?.data?.category?._id,
      class: data?.data?.class?._id,
      subject: data?.data?.subject?._id,
      chapter: data?.data?.chapter?._id,
      subChapter: data?.data?.subChapter?._id,
      subSubChapter: data?.data?.subSubChapter?._id,
    };

    const res = await updateAcademyContent({ id, info });
    if (res?.data?.success) {
      toast.success("Content update success");
      navigate("/admin/academy/contents");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Content</h2>

        <form onSubmit={handleEdit} className="p-4">
          <div className="content">
            <p className="mb-1">Content</p>
            <JoditEditor
              ref={editor}
              value={data?.data?.content}
              onBlur={(text) => setContent(text)}
              config={config}
            />
          </div>

          <div className="mt-2">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Edit Content"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
