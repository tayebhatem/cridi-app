import { DebtsType } from "@/types";
import { create } from "zustand";


interface DebtsState{
    debts:DebtsType[] | null;
    totalDebts:number  | null;
    setDebts:(debts:DebtsType[])=>void;
    setTotalDebts:(totalDebts:number)=>void
}

 const useDebtsStore=create<DebtsState>((set) => ({
    debts: null, 
    setDebts:(debts: DebtsType[]) =>
        set(() => ({
          debts,
        })),
    totalDebts:null,
    setTotalDebts:(totalDebts:number)=>
        set(()=>({
      totalDebts
        }))
  }));

  export default useDebtsStore