import { useEffect } from "react";
import parse from "html-react-parser";
import { useGetPrivacyQuery } from "../../Redux/api/privacyApi";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useGetPrivacyQuery();
  const privacy = data?.data;

  const description = privacy?.description && parse(privacy?.description);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <div className="mt-4">{description}</div>
        </div>
      </div>
    </section>
  );
}
