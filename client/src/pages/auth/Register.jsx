import React, { useState } from "react";
import Button from "../../components/modules/Button";
import Input from "../../components/modules/Input";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { toast } from "sonner";
import { emailRegex, passwordRegex, usernameRegex } from "../../lib/helpers";

const Register = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsHidden(!isHidden);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setErr("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatpassword");

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      return setErr("Please fill the fields");
    }

    if (!usernameRegex.test(username)) {
      return setErr("Username is not valid");
    }

    if (!emailRegex.test(email)) {
      return setErr("Email is not valid");
    }

    if (!passwordRegex.test(password)) {
      return setErr("Password is weak");
    }

    if (password !== repeatPassword) {
      return setErr("Passwords are not match");
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.status === 409) {
        setErr("User already exists");
      }

      if (res.status === 201) {
        toast.success("Account Created Successfully");
        navigate("/login");
      }
    } catch (error) {
      setErr("There is something wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-t p-5">
      <form
        action=""
        onSubmit={registerHandler}
        className="flex w-full flex-col gap-3 rounded-xl border border-muted p-4 shadow-xl md:w-1/3"
      >
        <h2 className="text-xl font-semibold text-main">Register</h2>
        <Input name={"username"} placeholder={"Username"} />
        <Input name={"email"} placeholder={"Email"} type={"email"} />
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
        <Input
          name={"repeatpassword"}
          placeholder={"Repeat password"}
          isHidden={true}
        />
        {err && <span className="px-2 text-sm text-red-500">{err}</span>}
        <Button>
          {isLoading ? (
            <LoaderCircle className="animate-spin" size={20} strokeWidth={1} />
          ) : (
            "Register"
          )}
        </Button>
        <span className="text-sm text-gray-600">
          already have an account ?{" "}
          <Link className="text-main" to={"/login"}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
