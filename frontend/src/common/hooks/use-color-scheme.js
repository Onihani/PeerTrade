// imports
import { useRecoilState } from "recoil";

// atoms
import { colorSchemeAtom } from "@/common/atoms";

// hook
function useColorScheme() {
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  function toggleColorScheme() {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  }

  return { colorScheme, toggleColorScheme };
}

export default useColorScheme;