import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddAdminMutation } from "../../../Redux/api/user/adminApi";

export default function AddAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [addAdmin, { isLoading }] = useAddAdminMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addAdmin(formData);
      if (res?.data?.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        toast.success(res?.data?.message || "Admin added successfully");
        navigate("/admin/admins");
      } else {
        toast.error(res?.data?.message || "Failed to add admin");
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded pb-4">
      <div className="border-b p-3 font-medium">
        <h3>Add Admin</h3>
      </div>
      <div className="p-4 border md:w-1/2 mx-auto mt-4 rounded">
        <form
          className="form_group flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
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

          <div>
            <button type="submit" className="primary_btn" disabled={isLoading}>
              {isLoading ? "Adding Admin..." : "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
