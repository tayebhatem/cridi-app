export interface AccountType{
    id:string;
    name:string;
    username:string;
    phone:string;
    avatar:string;
    type:'CLIENT'| 'SUPLIER'
}
export interface StoreType{
    id:string;
    name:string;
    phone:number;
    avatar:string;
    adress:string;

}
export interface AccountUserType{
  id:string;
  store:StoreType;

}
export interface delay{
    id:string;
    paymentDate:string;
    justify:string;
}
export interface DebtsType{
    id:string;
    amount:number;
    date:string;
    time:string;
    read:boolean;
    archived:boolean
}

export interface PaymentsType{
    id:string;
    oldAmount:number;
    amount:number;
    newAmount:number;
    date:string;
    time:string;
    read:boolean;
}