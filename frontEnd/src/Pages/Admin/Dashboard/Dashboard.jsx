import { MdFeaturedPlayList, MdOutlineCategory } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";

export default function Dashboard() {
  return (
    <div>
      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`shadow rounded p-4 bg-primary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Feature</h3>
            </div>
            <div>
              <MdFeaturedPlayList className="text-2xl" />
            </div>
          </div>

          <p>0</p>
        </div>

        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Category</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>0</p>
        </div>

        <div className={`shadow rounded p-4 bg-primary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total PACKAGE</h3>
            </div>
            <div>
              <TbPackages className="text-2xl" />
            </div>
          </div>

          <p>0</p>
        </div>

        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Admin</h3>
            </div>
            <div>
              <RiAdminFill className="text-2xl" />
            </div>
          </div>

          <p>0</p>
        </div>
      </section>
    </div>
  );
}
