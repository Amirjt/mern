import React, { useState } from "react";
import Button from "../../components/modules/Button";
import Input from "../../components/modules/Input";
import { Link } from "react-router-dom";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { toast } from "sonner";
import { emailRegex, usernameRegex } from "../../lib/helpers";

const Login = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [err, setErr] = useState("");

  const togglePasswordVisibility = () => {
    setIsHidden(!isHidden);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setErr("");
    setIsDisabled(true);

    const formData = new FormData(e.target);

    const identifier = formData.get("identifier");
    const password = formData.get("password");

    if (!identifier.trim() || !password.trim()) {
      return setErr("Please fill the fields");
    }

    if (!usernameRegex.test(identifier) && !emailRegex.test(identifier)) {
      return setErr("Username or Email is not valid");
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      if (res.status === 404) {
        setErr("User not found");
      }

      if (res.status === 401) {
        setErr("Username / email or password is not correct");
      }

      if (res.status === 200) {
        toast.success("Loged in Successfully");
        window.location.reload();
      }
    } catch (error) {
      setErr("There is something wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-t p-5">
      <form
        action=""
        onSubmit={loginHandler}
        className="flex w-full flex-col gap-3 rounded-xl border border-muted p-4 shadow-xl md:w-1/3"
      >
        <h2 className="text-xl font-semibold text-main">Login</h2>
        <Input name={"identifier"} placeholder={"Username or email"} />
        <Input
          name={"password"}
          placeholder={"Password"}
          isHidden={isHidden}
          type={"password"}
          icon={
            isHidden ? (
              <Eye
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
                size={20}
                strokeWidth={1}
              />
            ) : (
              <EyeOff
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
                size={20}
                strokeWidth={1}
              />
            )
          }
        />
        {err && <span className="px-2 text-sm text-red-500">{err}</span>}
        <Button isDisabled={isDisabled}>
          {isLoading ? (
            <LoaderCircle className="animate-spin" size={20} strokeWidth={1} />
          ) : (
            "Login"
          )}
        </Button>
        <span className="text-sm text-gray-600">
          Dont have an account ? {""}
          <Link className="text-main" to={"/register"}>
            Create
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
