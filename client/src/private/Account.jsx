import useSession from "../custom/useSession";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/modules/Loading";

const PrivateAccount = () => {
  const { session } = useSession();

  if (session.status === "") {
    return <Loading />;
  }

  if (session.status === "authenticated") {
    return <Outlet />;
  }

  return <Navigate to={"/"} />;
};

export default PrivateAccount;
