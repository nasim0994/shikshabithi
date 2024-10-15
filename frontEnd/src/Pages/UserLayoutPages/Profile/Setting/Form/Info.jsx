import { useSelector } from "react-redux";
import General from "./General";
import PersonalInfo from "./PersonalInfo";
import SocialLink from "./SocialLink";

export default function Info({ tab }) {
  const { loggedUser } = useSelector((store) => store.user);

  return (
    <div className="py-4 text-sm">
      {tab == 1 && <General loggedUser={loggedUser} />}
      {tab == 2 && <PersonalInfo loggedUser={loggedUser} />}
      {tab == 3 && <SocialLink loggedUser={loggedUser} />}
    </div>
  );
}
