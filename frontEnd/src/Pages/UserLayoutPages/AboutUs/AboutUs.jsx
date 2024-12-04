import { useGetAboutQuery } from "../../../Redux/api/aboutApi";
import parse from "html-react-parser";

export default function AboutUs() {
  window.scrollTo(0, 0);
  const { data } = useGetAboutQuery();
  const about = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        {about?.description && parse(about?.description)}
      </div>
    </section>
  );
}
