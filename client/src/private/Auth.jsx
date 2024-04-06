import useSession from "../custom/useSession";

import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/modules/Loading";

const PrivateAuth = () => {
  const { session } = useSession();

  if (session.status === "") {
    return <Loading />;
  }

  if (session.status === "authenticated") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateAuth;
