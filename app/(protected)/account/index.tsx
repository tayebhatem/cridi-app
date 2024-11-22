import React, { useEffect, useState } from "react";
import useAccountStore from "@/stores/useAccountStore";
import CustomerAccount from "@/components/customer/CustomerAccount";
import SupplierAccount from "@/components/supplier/SupplierAccount";

const AccountScreen = () => {
  const { account } = useAccountStore();

  if (account?.type === "SUPPLIER") return <SupplierAccount />;
  else return <CustomerAccount />;
};

export default AccountScreen;
