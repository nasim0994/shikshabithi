import { FcDownload } from "react-icons/fc";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function HandNoteDownload({ id }) {
  const { loggedUser } = useSelector((store) => store.user);

  const handleDownload = async (id) => {
    const userId = loggedUser?.data?._id;

    if (!userId) {
      return toast.error("Please login to download");
    }

    const packageData = loggedUser?.data?.package;

    if (!packageData?.package) {
      return toast.error("Please subscribe to a package to download handnotes");
    }

    if (packageData?.expires) {
      const isExpired = new Date(packageData?.expires) < new Date();
      if (isExpired) {
        toast.error("Your package has expired");
        return;
      }
    }

    const downloadLimit = parseInt(
      packageData?.package?.feature?.downloadHandNote
    );
    const userDownloadCount = parseInt(loggedUser?.data?.downloadhandnotes);
    if (userDownloadCount >= downloadLimit) {
      toast.error(
        "You have reached your download limit! please update package to download more"
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please login to download handnotes");
    }

    try {
      // Send GET request with the ID to download the PDF
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/handnotes/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);

        // Update the user download count
        const result = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/download/handnote`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (result.ok) {
          toast.success("PDF downloaded successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        alert("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error during download:", error);
      alert("Error generating PDF");
    }
  };

  return (
    <button onClick={() => handleDownload(id)}>
      <FcDownload />
    </button>
  );
}
