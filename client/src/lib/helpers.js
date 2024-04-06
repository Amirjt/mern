import { toast } from "sonner";

const usernameRegex = /^[a-z0-9_-]{8,15}$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const logoutHandler = async () => {
  const res = await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (res.status === 200) {
    toast.success("Loged out successfully");
    window.location.reload();
    window.location.replace("/");
  }
};

export { usernameRegex, emailRegex, passwordRegex, logoutHandler };
