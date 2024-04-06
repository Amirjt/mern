import { useEffect, useState } from "react";

const useSession = () => {
  const [session, setSession] = useState({
    data: null,
    status: "",
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setSession({
            data,
            status: "authenticated",
          });
        } else {
          setSession({
            data: null,
            status: "unauthenticated",
          });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setSession({
          data: null,
          status: "error",
        });
      }
    };

    checkAuthentication();
  }, []);

  return { session };
};

export default useSession;
