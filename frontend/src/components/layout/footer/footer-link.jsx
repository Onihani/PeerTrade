// next
import Link from "next/link";

const FooterLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="transition-colors hover:text-foreground/80 text-foreground/60"
    >
      {children}
    </Link>
  );
};

export default FooterLink;
