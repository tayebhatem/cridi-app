import { ImageSourcePropType } from "react-native";

export interface AccountType{
    id:string;
    name:string;
    username:string;
    email:string;
    phone:string;
    avatar:string;
    type:'CLIENT'| 'SUPLIER' | 'NONE',
    verified:boolean
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
  accepted:boolean;
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

export interface LanguageType{
    id:'en'|'fr'|'ar';
    name:string;
    image:ImageSourcePropType | undefined;
}
export interface publicationType{
    id:string;
    title:string;
    description:string;
    image:string;
    
}
export interface NotificationType{
    id:string;
    read:boolean;
    type:'debt'|'payment'|'publication'
    account:string;
    storeName:string;
    storeImage:string,
   text:string;
   accountuser:string;
   date:string;
}