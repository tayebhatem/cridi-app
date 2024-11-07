import { AccountType, SupplierType } from '@/types';
import {create} from 'zustand';

interface AccountState {
    account: AccountType | null; 
    supplier:SupplierType | null;
    accountId:string | null;
    setAccount: (account: AccountType) => void; 
    setSupplier: (supplier:SupplierType) => void; 
    setAccountId: (accountId:string) => void; 
    clearAccount: () => void; 
    setAvatar: (phone: string) => void; 
  }

 const useAccountStore = create<AccountState>((set) => ({
    account: null, 
    accountId:null,
    supplier:null,
    setAccountId: (accountId:string) =>
      set(() => ({
        accountId
      })),
    setAccount: (account: AccountType) =>
      set(() => ({
        account,
      })),
      setSupplier: (supplier:SupplierType) =>
        set(() => ({
          supplier,
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