import { StoreType } from "@/types";
import { create } from "zustand";


interface StoreState{
    store:StoreType | null,
    setStore:(store:StoreType)=>void
}

const useStore=create<StoreState>((set) => ({
    store: null, 
    setStore: (store: StoreType) =>
      set(() => ({
        store,
      })),
   
  }));

export default useStore