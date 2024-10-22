import { AccountType } from '@/types';
import {create} from 'zustand';

interface AccountState {
    account: AccountType | null; 
    setAccount: (account: AccountType) => void; 
    clearAccount: () => void; 
    setAvatar: (phone: string) => void; 
  }

 const useAccountStore = create<AccountState>((set) => ({
    account: null, 
    setAccount: (account: AccountType) =>
      set(() => ({
        account,
      })),
      setAvatar: (avatar: string) =>
        set((state) => ({
          account: state.account ? { ...state.account, avatar } : null,
        })),
     
    clearAccount: () =>
      set(() => ({
        account: null,
      })),
  }));

  export default useAccountStore;