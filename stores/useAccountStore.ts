import { AccountType } from '@/types';
import {create} from 'zustand';

interface AccountState {
    account: AccountType | null; 
    setAccount: (account: AccountType) => void; 
    clearAccount: () => void; 
    setName: (name: string) => void; 
    setPhone: (phone: string) => void; 
  }

 const useAccountStore = create<AccountState>((set) => ({
    account: null, 
    setAccount: (account: AccountType) =>
      set(() => ({
        account,
      })),
      setName: (name: string) =>
        set((state) => ({
          account: state.account ? { ...state.account, name } : null,
        })),
        setPhone: (phone: string) =>
          set((state) => ({
            account: state.account ? { ...state.account, phone } : null,
          })),
    clearAccount: () =>
      set(() => ({
        account: null,
      })),
  }));

  export default useAccountStore;