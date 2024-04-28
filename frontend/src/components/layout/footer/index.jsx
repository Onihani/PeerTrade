// next
import Link from "next/link";

// components
import Logo from "../logo";
import FooterLink from "./footer-link";

const Footer = () => {
  return (
    <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
        <div>
          <Logo hiddenSm={false} />
          <div>
            A product by{" "}
            <Link
              target="__blank"
              className="dark:text-sky-500 text-neutral-600 font-medium"
              href="https://github.com/onihani"
            >
              Onihani
            </Link>
          </div>
          <div className="mt-2">
            Building in public. View source on{" "}
            <Link
              className="dark:text-sky-500 font-medium text-neutral-600"
              target="__blank"
              href="https://github.com"
            >
              GitHub
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center space-y-4 flex-col mt-4">
            <FooterLink href="/trade">Trade</FooterLink>
            <FooterLink href="/buy">Buy Stable Coins</FooterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
