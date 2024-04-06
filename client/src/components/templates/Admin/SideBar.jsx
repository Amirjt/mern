import { Link, useLocation } from "react-router-dom";
import { AdminDashboardLinks } from "../../../lib/constants";
import Button from "../../modules/Button";
import { LogOut } from "lucide-react";
import useSession from "../../../custom/useSession";

import { logoutHandler } from "../../../lib/helpers";

const SideBar = () => {
  const { session } = useSession();

  const location = useLocation();

  return (
    <div className="relative flex h-screen flex-col gap-4 rounded-r-lg border border-muted p-4 shadow-sm md:gap-14">
      <div className="flex items-center gap-3 rounded-lg p-2">
        <img
          alt="profile"
          src={"/images/noavatar.png"}
          height={30}
          width={30}
        />
        <h2 className="hidden text-sm font-bold capitalize md:block">
          Welcome {session.data?.username}
        </h2>
      </div>
      <ul className="flex h-full flex-col gap-2">
        {AdminDashboardLinks.map((link) => (
          <li key={link.id}>
            <Link
              to={link.path}
              className={`${location.pathname === link.path && "bg-blue-500 text-white"} flex items-center gap-3 rounded-lg p-2 transition-all duration-300 hover:-translate-y-1`}
            >
              <link.icon strokeWidth={1.1} />
              <span className="hidden md:block">{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mx-auto self-end">
        <Button
          onClick={logoutHandler}
          className={"flex items-center gap-3 bg-rose-500"}
        >
          <LogOut strokeWidth={1.1} size={19} />
          <span className="hidden md:block">Log out</span>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
