import useSession from "../custom/useSession";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/modules/Loading";

const PrivateAdminPanel = () => {
  const { session } = useSession();

  if (session.status === "") {
    return <Loading />;
  }

  if (session.status === "unauthenticated" || !session.data || session.data.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default PrivateAdminPanel;
