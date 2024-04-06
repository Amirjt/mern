import { headerLinks } from "../../lib/constants";
import { Link } from "react-router-dom";

import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 flex flex-col items-center justify-between gap-10 border-t p-20 sm:flex-row">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold">About us</h2>
        <p className="text-center text-sm leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
          sunt.
        </p>
      </div>
      <div className="flex w-1/2 flex-col items-center gap-4">
        <h2 className="font-bold md:text-xl">Quick Access</h2>
        <div className="flex flex-col items-center gap-2">
          {headerLinks.map((link) => (
            <Link className="hover:opacity-85" key={link.id} to={link.path}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:w-1/2">
        <h2 className="text-xl font-bold">Social Media</h2>
        <div className="flex items-center gap-3">
          <Instagram color="red" />
          <Twitter color="blue" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
