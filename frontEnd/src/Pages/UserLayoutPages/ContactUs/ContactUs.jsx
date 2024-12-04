import { BsWhatsapp } from "react-icons/bs";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useGetContactQuery } from "../../../Redux/api/contactApi";
import parse from "html-react-parser";

export default function ContactUs() {
  window.scrollTo(0, 0);
  const { data } = useGetContactQuery();
  const contact = data?.data[0];

  return (
    <section className="py-6">
      <div className="container">
        <h3 className="text-xl sm:text-3xl font-semibold text-primary text-center">
          Contact Us
        </h3>

        <div className="mt-4 bg-base-100 rounded shadow p-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-neutral">
                {contact?.title}
              </h3>

              <div className="mt-4 flex flex-col gap-1.5 text-neutral">
                <div className="flex items-start gap-3 rounded border bg-base-100 p-4">
                  <p>
                    <FaPhone className="mt-1.5 text-base" />
                  </p>

                  <div>
                    <p className="text-lg font-medium">Phone</p>
                    <p className="text-neutral-content">{contact?.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded border bg-base-100 p-4">
                  <p>
                    <BsWhatsapp className="mt-1.5 text-lg" />
                  </p>

                  <div>
                    <p className="text-lg font-medium">whatsapp</p>
                    <p className="text-neutral-content">{contact?.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded border bg-base-100 p-4">
                  <p>
                    <MdOutlineMail className="mt-1.5 text-xl" />
                  </p>
                  <div>
                    <p className="text-lg font-medium">Email</p>
                    <p className="text-neutral-content">{contact?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded border bg-base-100 p-4">
                  <p>
                    <FaLocationDot className="mt-1.5 text-xl" />
                  </p>
                  <div>
                    <p className="text-lg font-medium">Address</p>
                    <p className="text-neutral-content">{contact?.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold text-neutral">
                Get In Touch
              </h4>
              <form className="flex flex-col gap-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full rounded border px-4 py-2 outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full rounded border px-4 py-2 outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full rounded border px-4 py-2 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded border px-4 py-2 outline-none"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Type you message..."
                    className="w-full rounded border px-4 py-2 outline-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <button type="submit" className="primary_btn">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full rounded overflow-hidden">
          {contact?.map && parse(contact?.map)}
        </div>
      </div>
    </section>
  );
}
