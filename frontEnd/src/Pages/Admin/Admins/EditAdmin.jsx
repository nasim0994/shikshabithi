import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} from "../../../Redux/api/user/adminApi";

export default function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { data } = useGetAdminByIdQuery(id);
  const admin = data?.data;

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin?.profile?.name,
        email: admin?.email,
      });
    }
  }, [admin]);

  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateAdmin({ id, formData });
      if (res?.data?.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        toast.success(res?.data?.message || "Admin update successfully");
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
            <button type="submit" className="primary_btn" disabled={isLoading}>
              {isLoading ? "Editng Admin..." : "Update Admin"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
