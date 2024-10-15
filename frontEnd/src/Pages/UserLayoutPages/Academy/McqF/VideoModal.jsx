import { useEffect, useState } from "react";
import parser from "html-react-parser";

export default function VideoModal({ modal, videoLink, setModal }) {
  const [currentVideo, setCurrentVideo] = useState(videoLink);

  useEffect(() => {
    if (!modal) {
      setCurrentVideo("");
    } else {
      setCurrentVideo(videoLink);
    }
  }, [modal, videoLink]);

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className={`overlay ${modal && "overlay_show"}`}
      ></div>

      <div
        className={`modal w-full md:w-[60%] h-80 md:h-[500px] mx-auto mt-20 md:mt-0 ${
          modal && "modal_show"
        }`}
      >
        {/* <div className="flex justify-end p-4 ">
          <button onClick={() => setModal(false)} className="">
            <MdOutlineClose className="text-xl hover:text-red-500" />
          </button>
        </div> */}
        <div id="video-container" className="p-4 h-full">
          {currentVideo ? (
            parser(currentVideo)
          ) : (
            <p className="text-center font-semibold text-xl text-secondary">
              No video Available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
