// components
import Logo from "../logo";
import NavLink from "./nav-link";
import WalletButton from "./wallet-button";
import ToggleThemeButton from "./toggle-theme-button";

// data
import { navigation } from "@/common/data";

// hooks
import { useStore } from "@/common/hooks";

const Navbar = () => {
  const { signedAccountId } = useStore();
  const walletConnected = Boolean(signedAccountId);

  return (
    <header
      // z-[50] fixed top-0 
      className="w-full border-b backdrop-blur-sm bg-white/[0.6] dark:bg-black/[0.6] border-neutral-200 dark:border-white/[0.1]"
      style={{ transform: "none" }}
    >
      <div className="container flex h-16 items-center max-w-[88rem] mx-auto">
        <Logo />
        <nav className="flex items-center space-x-6 text-sm font-medium xl:flex">
          {navigation.map((nav) => (
            <NavLink key={nav.href} href={nav.href}>
              {nav.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
         {walletConnected && <NavLink href="/dashboard">Dashboard</NavLink>}
          <ToggleThemeButton />
          <WalletButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
