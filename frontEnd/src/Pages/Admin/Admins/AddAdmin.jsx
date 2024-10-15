export default function AddAdmin() {
  return (
    <section className="bg-base-100 shadow rounded pb-4">
      <div className="border-b p-3 font-medium">
        <h3>Add New Administrator</h3>
      </div>
      <div className="p-4 border md:w-2/3 mx-auto mt-4 rounded">
        <form className="form_group flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Full Name</p>
              <input type="text" name="name" required />
            </div>
            <div>
              <p className="text-neutral-content text-sm">Email</p>
              <input type="email" name="email" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Password</p>
              <input type="password" name="password" required />
            </div>
            <div>
              <p className="text-neutral-content text-sm">Phone</p>
              <input type="text" name="phone" required />
            </div>
          </div>

          <div>
            <button className="primary_btn">Add Admin</button>
          </div>
        </form>
      </div>
    </section>
  );
}
