
import React, { useEffect, useState } from 'react'
import useAccountStore from '@/stores/useAccountStore'
import CustomerAccount from '@/components/account/CustomerAccount'
import SupplierAccount from '@/components/account/SupplierAccount'




const AccountScreen = () => {
    const {account}=useAccountStore();
  
   
   
  return (
<>
{
  account?.type==='CLIENT'? <CustomerAccount/>:
  <SupplierAccount/>
}
</>
  )
}

export default AccountScreen