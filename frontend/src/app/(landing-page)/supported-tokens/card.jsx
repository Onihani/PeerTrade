// next
import Link from "next/link";
import Image from "next/image";

const TokenCard = ({ name, logo, link, type }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md p-4 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/20 transition-colors duration-100 group">
      <Image
        className="hidden dark:block mb-4 mt-2 h-10 select-none"
        src={logo}
        alt={name}
        title={name}
        width={40}
        height={40}
        loading="lazy"
      />{" "}
      <Image
        className="block dark:hidden mb-4 mt-2 h-10 select-none"
        src={logo}
        alt={name}
        title={name}
        width={40}
        height={40}
        loading="lazy"
      />{" "}
      <div className="mb-3 flex flex-col space-y-1 items-center justify-center">
        <p className="truncate text-[15px] font-medium text-balance text-center select-all">
          {name}
        </p>{" "}
        <div className="flex items-center space-x-1 justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-mono hover:underline hover:bg-neutral-200 dark:hover:bg-neutral-700/50 transition-colors duration-100">
            {type}
          </span>
        </div>
      </div>{" "}
      <div className="flex items-center space-x-1">
        <Link
          href={link}
          title={name}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <span>explorer</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide-icon lucide lucide-link "
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </Link>{" "}
      </div>
    </div>
  );
};

export default TokenCard;
