import { Link, useLocation } from "react-router-dom";
import { headerLinks } from "../../lib/constants";
import { useState } from "react";
import useSession from "../../custom/useSession";

import {
  UserRoundCog,
  ShoppingBasket,
  LogOut,
  Box,
  Fingerprint,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import Button from "./Button";
import { logoutHandler } from "../../lib/helpers";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { session } = useSession();

  return (
    <>
      <header className="flex h-[84px] items-center justify-between rounded-b-lg p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Menu
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden"
            strokeWidth={1.5}
          />
          <h2 className="  mt-[1px] text-lg font-bold text-main lg:text-xl">
            MERN Ecommerce
          </h2>
        </div>
        <div className=" hidden items-center gap-2  text-sm  lg:flex">
          {headerLinks.map((link) => (
            <Link
              className={`${
                location.pathname === link.path &&
                "rounded-lg bg-main text-white"
              } px-4 py-2 font-semibold duration-200 hover:-translate-y-1`}
              key={link.id}
              to={link.path}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div>
          {session.status !== "" && session.status === "authenticated" ? (
            <div className="group relative cursor-pointer text-sm font-semibold ">
              <img className="w-10" src="/images/noavatar.png" alt="" />
              <div className="invisible absolute right-0 top-full z-[1000] mt-3 flex w-60 flex-col gap-3 rounded-lg border border-muted bg-white p-3 opacity-0 shadow-sm duration-300 group-hover:visible group-hover:opacity-100">
                <span className=" mb-1 border-b border-muted pb-2 capitalize tracking-tight text-main">
                  {session.data.username}
                </span>
                <Link
                  className="flex items-center justify-between duration-200 hover:opacity-70"
                  to={"/cart"}
                >
                  <span>Cart</span>
                  <ShoppingBasket
                    size={21}
                    strokeWidth={1.5}
                    className="mb-0.5"
                  />
                </Link>
                <Link
                  className="flex items-center justify-between duration-200 hover:opacity-70"
                  to={"/cart"}
                >
                  <span>Orders</span>
                  <Box size={21} strokeWidth={1.5} className="mb-0.5" />
                </Link>
                <Link
                  className="flex items-center justify-between border-b border-muted pb-2 duration-200 hover:opacity-70"
                  to={"/cart"}
                >
                  <span>Account Details</span>
                  <UserRoundCog
                    size={21}
                    strokeWidth={1.5}
                    className="mb-0.5"
                  />
                </Link>
                <Button
                  onClick={logoutHandler}
                  className={"flex items-center gap-2 bg-rose-500"}
                >
                  Log out <LogOut size={19} />
                </Button>
              </div>
            </div>
          ) : (
            session.status !== "" && (
              <div className="flex items-center gap-2">
                <Button>
                  <Link className="flex items-center gap-2" to={"/login"}>
                    <Fingerprint strokeWidth={1.1} size={20} />
                    <span className="hidden md:block">Login</span>
                  </Link>
                </Button>
                <Button styles={{ backgroundColor: "#34D399" }}>
                  <Link className="flex items-center gap-2" to={"/register"}>
                    <UserPlus strokeWidth={1.1} size={20} />
                    <span className="hidden md:block">Register</span>
                  </Link>
                </Button>
              </div>
            )
          )}
        </div>
      </header>
      <div
        className={`absolute left-0 top-0 z-[1000] h-screen border  border-muted bg-gray-100 shadow-sm duration-200 ${
          isMenuOpen ? "visible w-1/2 opacity-100" : "invisible w-0 opacity-0"
        }`}
      >
        <div className="relative flex h-full w-full flex-col items-center gap-3 px-5 py-14">
          <X
            onClick={() => setIsMenuOpen(false)}
            className="absolute right-3 top-3"
            strokeWidth={1.1}
          />
          <h2
            className={`w-full border-b border-main pb-2 text-lg font-bold duration-200`}
          >
            <span className="text-main">Mern</span> Ecommerce
          </h2>
          {headerLinks.map((link) => (
            <Link
              className={`${
                location.pathname === link.path &&
                "rounded-lg bg-main text-white"
              } mt-1 w-full px-4 py-2 text-center font-semibold duration-200 hover:-translate-y-1`}
              key={link.id}
              to={link.path}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
