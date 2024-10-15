export default function Contact() {
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const phone = e.target.phone.value;
    const whatsapp = e.target.whatsapp.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const facebookLink = e.target.facebook.value;
    const instagramLink = e.target.instagram.value;
    const youtubeLink = e.target.youtube.value;
    const linkedinLink = e.target.linkedin.value;

    const data = {
      title,
      description,
      phone,
      whatsapp,
      email,
      address,
      facebookLink,
      instagramLink,
      youtubeLink,
      linkedinLink,
    };

    console.log(data);

    // if (!id) {
    //   try {
    //     const res = await addContactUs(data).unwrap();

    //     if (res?.success) {
    //       e.target.reset();
    //       Swal.fire("", "Contact Us has been added successfully!", "success");
    //     }
    //   } catch (error) {
    //     Swal.fire("", error.data.error, "error");
    //   }
    // } else {
    //   try {
    //     const res = await updateContactUsById({ id, data }).unwrap();
    //     if (res?.success) {
    //       Swal.fire("", "Contact Us has been updated successfully!", "success");
    //     }
    //   } catch (error) {
    //     Swal.fire("", error.data.error, "error");
    //   }
    // }
  };

  return (
    <section className="bg-base-100 shadow rounded pb-4 min-h-[86vh]">
      <div className="p-4 border-b text-neutral font-medium">
        <h3>Contact Info</h3>
      </div>
      <form onSubmit={handleUpdateContact} className="p-4 mt-3 text-sm">
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div>
              <p className="text-neutral-content">Title</p>
              <input type="text" name="title" />
            </div>
            <div>
              <p className="text-neutral-content">Description</p>
              <input type="text" name="description" />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-content">Phone</p>
                <input type="text" name="phone" />
              </div>

              <div>
                <p className="text-neutral-content">Whatsapp</p>
                <input type="text" name="whatsapp" />
              </div>
            </div>

            <div>
              <p className="text-neutral-content">Email</p>
              <input type="email" name="email" />
            </div>

            <div>
              <p className="text-neutral-content">Address</p>
              <textarea name="address"></textarea>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-content">Facebook Link</p>
                <input type="text" name="facebook" />
              </div>

              <div>
                <p className="text-neutral-content">Instagram Link</p>
                <input type="text" name="instagram" />
              </div>

              <div>
                <p className="text-neutral-content">Youtube Link</p>
                <input type="text" name="youtube" />
              </div>

              <div>
                <p className="text-neutral-content">Linkedin Link</p>
                <input type="text" name="linkedin" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* <button
            disabled={(updateContactLoading || addContactLoading) && "disabled"}
            className="gradient-primary-btn"
            type="submit"
          >
            {updateContactLoading || addContactLoading
              ? "Loading..."
              : id
              ? "Update Contact"
              : "Add Contact"}
          </button> */}
          <button className="primary_btn">Add Contact</button>
        </div>
      </form>
    </section>
  );
}
