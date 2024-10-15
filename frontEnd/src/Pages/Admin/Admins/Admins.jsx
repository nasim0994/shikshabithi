import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Admins() {
  return (
    <section>
      <div className="flex justify-end mb-2">
        <Link to="/admin/admins/add" className="primary_btn">
          Add Administrator
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-lg bg-base-100">
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-2">name</div>
              </td>
              <td>email</td>
              <td>phone</td>
              <td>
                <button>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
