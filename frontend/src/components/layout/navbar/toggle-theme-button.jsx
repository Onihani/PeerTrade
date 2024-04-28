// hooks
import { useColorScheme } from "@/common/hooks";

const ToggleThemeButton = () => {
  const { toggleColorScheme } = useColorScheme();

  return (
    <button
      onClick={toggleColorScheme}
      className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 flex items-center justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-moon h-4 w-4   dark:text-neutral-500 text-neutral-500"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ToggleThemeButton;
