// next
import Link from "next/link";

const NavLink = ({ children, href }) => {
  return (
    <Link
      className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:block"
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
