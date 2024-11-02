import { useGetAllUsersOnlyQuery } from "../../../Redux/api/user/userApi";

export default function Users() {
  const { data } = useGetAllUsersOnlyQuery();
  const users = data?.data;

  return (
    <section>
      <div className="relative overflow-x-auto shadow-lg bg-base-100">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>package</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user?._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {user?.profile?.name}
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>{user?.package?.title || "Gest User"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
