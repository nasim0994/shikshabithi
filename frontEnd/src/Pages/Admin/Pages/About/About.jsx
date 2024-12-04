import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import {
  useAddAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../../../Redux/api/aboutApi";

export default function About() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [id, setId] = useState(null);

  const { data: about, isLoading } = useGetAboutQuery();
  const [addAbout, { isLoading: addIsLoading }] = useAddAboutMutation();
  const [updateAbout, { isLoading: uIsLoading }] = useUpdateAboutMutation();

  useEffect(() => {
    if (about) {
      setContent(about?.data?.description);
      setId(about?.data?._id);
    }
  }, [about]);

  const handleAboutus = async (e) => {
    e.preventDefault();
    const info = { description: content };

    try {
      if (id) {
        const res = await updateAbout({ id, data: info });
        if (res?.data?.success) {
          Swal.fire("Success", "Aboutus updated successfully", "success");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      } else {
        const res = await addAbout(info);
        if (res?.data?.success) {
          Swal.fire("Success", "Aboutus created successfully", "success");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.log(error);
    }
  };

  return (
    <div className="make_privacy_policy">
      <h2 className="mb-3 text-center text-xl font-medium text-primary sm:text-2xl">
        {id ? "Edit About Us" : "Create About Us"}
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleAboutus}>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            className="h400"
          />
          <div className="mt-4">
            <button
              className="primary_btn"
              disabled={addIsLoading || uIsLoading}
            >
              {addIsLoading || uIsLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
