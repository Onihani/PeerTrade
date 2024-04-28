// next
import Link from "next/link";
import Image from "next/image";

// helpers
import { classnames as cn } from "@/common/helpers";

const Logo = ({ hiddenSm = true }) => {
  return (
    <>
      <div
        className={cn("mr-4 md:flex", {
          hidden: hiddenSm,
        })}
      >
        <Link
          className="flex items-center justify-center space-x-2 text-2xl font-bold py-6 text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
          href="/"
        >
          <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
            <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl" />
            <div className="text-sm  text-emerald-500 relative z-20">
              <Image
                alt="Logo"
                loading="lazy"
                width={50}
                height={50}
                decoding="async"
                data-nimg={1}
                style={{ color: "transparent" }}
                src="https://placehold.co/65x65/000000/FFFFFF.png"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black dark:text-white">PeerTrade</h1>
          </div>
        </Link>
      </div>
      <Link
        className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:rn:"
        data-state="closed"
        href="/"
      >
        <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
          <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl" />
          <div className="text-sm  text-emerald-500 relative z-20">
            <Image
              alt="Logo"
              loading="lazy"
              width={50}
              height={50}
              decoding="async"
              data-nimg={1}
              style={{ color: "transparent" }}
              src="https://placehold.co/65x65/000000/FFFFFF.png"
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Logo;
