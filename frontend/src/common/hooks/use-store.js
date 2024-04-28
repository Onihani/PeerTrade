// imports
import { create as createStore } from "zustand";

// store to share wallet and signedAccountId
const useStore = createStore((set) => ({
  wallet: undefined,
  signedAccountId: "",
  setWallet: (wallet) => set({ wallet }),
  setSignedAccountId: (signedAccountId) => set({ signedAccountId }),
}));

export default useStore;