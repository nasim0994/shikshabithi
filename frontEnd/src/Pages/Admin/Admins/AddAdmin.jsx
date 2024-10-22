import { useState } from "react";
import { useAddAdminMutation } from "../../../Redux/api/user/authApi";
import Swal from "sweetalert2";

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [addAdmin, { isLoading, isError, isSuccess, error }] =
    useAddAdminMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addAdmin(formData).unwrap();
      if (res.success) {
        Swal.fire("Success", "Admin added successfully!", "success");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Failed to add admin:", error);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded pb-4">
      <div className="border-b p-3 font-medium">
        <h3>Add New Administrator</h3>
      </div>
      <div className="p-4 border md:w-2/3 mx-auto mt-4 rounded">
        <form
          className="form_group flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Full Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p className="text-neutral-content text-sm">Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <button type="submit" className="primary_btn" disabled={isLoading}>
              {isLoading ? "Adding Admin..." : "Add Admin"}
            </button>
          </div>
        </form>

        {isError && (
          <p className="text-red-500">
            Error: {error?.data?.message || "Something went wrong"}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500">Admin added successfully!</p>
        )}
      </div>
    </section>
  );
}
