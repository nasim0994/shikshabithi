import { Link } from "react-router-dom";

export default function Campaign() {
  return (
    <section>
      <div className="container">
        <div className="bg-black text-base-100 rounded-xl py-10 px-6">
          <h2 className="text-lg md:text-3xl font-semibold">
            সেরা শিক্ষকের তৈরি ক্লাস নোট এবং <br /> লেকচার শিট প্রয়োজন?
          </h2>

          <div className="mt-6">
            <Link to="/signup">
              <h2 className="w-max bg-primary px-4 py-2 rounded">
                রেজিস্ট্রেশন করুন
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
