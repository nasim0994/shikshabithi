import { useState } from "react";
import ChangePassword from "./Form/ChangePassword";
import Info from "./Form/Info";

export default function Setting() {
  const [tab, settab] = useState(1);

  return (
    <div className="bg-base-100 shadow">
      <div className="border-b p-3">
        <h2 className="text-lg font-medium">Profile Setting</h2>
      </div>

      <div className="mt-2 p-3">
        <div className="flex gap-2 text-neutral-content border-b text-sm">
          <button
            onClick={() => settab(1)}
            className={`px-2 pb-2.5 ${
              tab == 1 && "text-primary border-b border-primary"
            }`}
          >
            General
          </button>
          <button
            onClick={() => settab(2)}
            className={`px-2 pb-2.5 ${
              tab == 2 && "text-primary border-b border-primary"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => settab(3)}
            className={`px-2 pb-2.5 ${
              tab == 3 && "text-primary border-b border-primary"
            }`}
          >
            Social Link
          </button>
          <button
            onClick={() => settab(4)}
            className={`px-2 pb-2.5 ${
              tab == 4 && "text-primary border-b border-primary"
            }`}
          >
            Change Password
          </button>
        </div>

        {tab == 4 ? <ChangePassword /> : <Info tab={tab} />}
      </div>
    </div>
  );
}
