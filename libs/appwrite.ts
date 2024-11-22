import {
  Client,
  ID,
  Databases,
  Query,
  Storage,
  ImageGravity,
  Avatars,
} from "react-native-appwrite";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { toZonedTime } from "date-fns-tz";
import {
  AccountType,
  AccountUserType,
  publicationType,
  SubscriptionType,
  SupplierType,
} from "@/types";
import { format } from "date-fns";
import { states, supplierFields } from "@/constants/supplier";
export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT || "")
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFROM || "");
export const databases = new Databases(client);
export const config = {
  database: process.env.EXPO_PUBLIC_APPWRITE_DATABASE || "",
  accountSession: "6707a05800140d008a02",
  account: "66b09b570034158307ad",
  supplier: "66adf35300258c35865d",
  accountUser: "66f6d4d1003bc312bdf3",
  transactions: "66a6c74f00196e1fa95b",
  payments: "66a6c7f8003df82e5105",
  publications: "671070c4002b21cb9b62",
  notifications: "671106110007cf9a44a5",
  reports: "671105b5003c7b3bc573",
  store: "66a6c686000201cfb22a",
  verificationToken: "671afa70000ba184b603",
  subscriptin: "66ac9636002ccba4aa52",
  delay: "66a6c85100076d87d9f2",
  profileBucket: process.env.EXPO_PUBLIC_APPWRITE_PROFILE_PUCKET || "",
};
export const storage = new Storage(client);
export const avatar = new Avatars(client);
async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export const createAccount = async (
  username: string,
  name: string,
  password: string
) => {
  const avatarUrl = avatar.getInitials(name).toString();
  const data = await databases.createDocument(
    config.database,
    config.account,
    ID.unique(),
    {
      username,
      password,
      name,
      avatar: avatarUrl,
      type: "NONE",
    }
  );
  if (data) {
    const session = await createSession(data.$id);
    if (session) await save("session", session.$id);

    return session;
  }
};

export const login = async (username: string, password: string) => {
  const data = await databases.listDocuments(config.database, config.account, [
    Query.equal("username", username),
  ]);
  if (data.documents[0]) {
    if (data.documents[0].password !== password)
      throw new Error("Wrong password.");

    const session = await createSession(data.documents[0].$id);
    if (session) await save("session", session.$id);
    return session;
  } else {
    throw new Error("Wrong username.");
  }
};

export const createSession = async (account: string) => {
  try {
    const expire = new Date();
    expire.setDate(expire.getDate() + 365);
    const session = await databases.createDocument(
      config.database,
      config.accountSession,
      ID.unique(),
      {
        account,
        expire,
      }
    );

    return session;
  } catch (error) {
    console.log(error);
  }
};
export const getSession = async () => {
  const sessionId = await SecureStore.getItemAsync("session");

  if (sessionId) {
    const session = await databases.getDocument(
      config.database,
      config.accountSession,
      sessionId
    );

    return session;
  }
};

export const deleteSession = async () => {
  try {
    const sessionId = await SecureStore.getItemAsync("session");
    if (sessionId) {
      const response = await databases.deleteDocument(
        config.database,
        config.accountSession,
        sessionId
      );

      if (response) {
        await SecureStore.deleteItemAsync("sesssion");

        return response;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = async (
  id: string,
  name: string,
  phone: string
) => {
  try {
    const data = await databases.updateDocument(
      config.database,
      config.account,
      id,
      {
        name,
        phone,
      }
    );
    const updatedAccount: AccountType = {
      id: data.$id,
      name: data.name,
      avatar: data.avatar,
      type: data.type,
      phone: data.phone,
      username: data.username,
      email: data.eamil,
      verified: data.verified,
    };

    return updatedAccount;
  } catch (error) {
    console.log(error);
  }
};

export const updateAccountDeviceToken = async (
  id: string,
  deviceToken: string
) => {
  try {
    const data = await databases.updateDocument(
      config.database,
      config.account,
      id,
      {
        deviceToken,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAccountByEmail = async (email: string) => {
  const data = await databases.listDocuments(config.database, config.account, [
    Query.equal("email", email),
  ]);
  const account: AccountType = {
    id: data.documents[0].$id,
    name: data.documents[0].name,
    avatar: data.documents[0].avatar,
    type: data.documents[0].type,
    phone: data.documents[0].phone,
    username: data.documents[0].username,
    email: data.documents[0].email,
    verified: data.documents[0].verified,
  };

  return account;
};

export const updateAccountType = async (
  type: "CLIENT" | "SUPPLIER",
  id: string
) => {
  try {
    const data = await databases.updateDocument(
      config.database,
      config.account,
      id,
      {
        type,
      }
    );
    const updatedAccount: AccountType = {
      id: data.$id,
      name: data.name,
      avatar: data.avatar,
      type: data.type,
      phone: data.phone,
      username: data.username,
      email: data.eamil,
      verified: data.verified,
    };

    return updatedAccount;
  } catch (error) {
    console.log(error);
  }
};

export const getAccount = async (account: string) => {
  try {
    const data = await databases.getDocument(
      config.database,
      config.account,
      account
    );

    return data;
  } catch (error) {}
};
export const checkCurrentPassword = async (id: string, oldPassword: string) => {
  const account = await getAccount(id);
  if (!account) return;

  const currentPassword = account.password;

  if (currentPassword !== oldPassword) {
    return false;
  } else {
    return true;
  }
};
export const updatePassword = async (id: string, newpassword: string) => {
  const data = await databases.updateDocument(
    config.database,
    config.account,
    id,
    {
      password: newpassword,
    }
  );

  return data;
};

export const createPublication = async () => {
  try {
  } catch (error) {}
};

export const getPublications = async () => {
  const data = await databases.listDocuments(
    config.database,
    config.publications
  );

  const pubs = data.documents.map((item) => {
    const data: publicationType = {
      id: item.$id,
      url: item.url,
      image: item.image,
    };
    return data;
  });

  return pubs;
};

export const sendReport = async (message: string, account: string) => {
  try {
    const data = await databases.createDocument(
      config.database,
      config.reports,
      ID.unique(),
      {
        account,
        message,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUserAvatar = async (id: string, url: URL) => {
  try {
    await databases.updateDocument(config.database, config.account, id, {
      avatar: url,
    });
  } catch (error) {
    console.log(error);
  }
};

const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      config.profileBucket,
      fileId,
      2000,
      2000,
      "top" as ImageGravity,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error("show file error : " + error);
  }
};

export const uploadImage = async (file: any, id: string) => {
  if (!file) return;
  const { uri, mimeType, fileName } = file;
  const response = await fetch(uri);
  const blob = await response.blob();
  const size = blob.size;
  const asset = {
    uri,
    type: mimeType,
    size,
    name: fileName,
  };
  try {
    const file = await storage.createFile(
      config.profileBucket,
      ID.unique(),
      asset
    );
    if (!file) throw Error;
    const fileUrl = await getFilePreview(file.$id);
    await updateUserAvatar(id, fileUrl);
    return fileUrl;
  } catch (error: any) {
    throw new Error("create file error : " + error);
  }
};
export const createRequest = async (account: AccountType, user: string) => {
  try {
    const { username, id, type } = account;
    const data = await databases.createDocument(
      config.database,
      config.accountUser,
      ID.unique(),
      {
        username,
        type,
        user,
        accepted: false,
        account: id,
        receiver: user,
      }
    );
    const accountUser: AccountUserType = {
      id: data.$id,
      accepted: data.accepted,
      store: {
        id: data.user.$id,
        adress: data.user.adress,
        avatar: data.user.avatar,
        name: data.user.name,
        phone: data.user.phone,
      },
    };
    return accountUser;
  } catch (error) {}
};
export const deleteRequest = async (id: string) => {
  try {
    await databases.deleteDocument(config.database, config.accountUser, id);
  } catch (error) {}
};
export const createEmail = async (id: string, email: string) => {
  const data = await databases.updateDocument(
    config.database,
    config.account,
    id,
    {
      email,
    }
  );
  const updatedAccount: AccountType = {
    id: data.$id,
    name: data.name,
    avatar: data.avatar,
    type: data.type,
    phone: data.phone,
    username: data.username,
    email: data.email,
    verified: data.verified,
  };
  return updatedAccount;
};

export const sendOtp = async (
  account: string,
  type: "account" | "password"
) => {
  const response = await deleteOldToken(account);

  const token = Math.floor(1000 + Math.random() * 9000).toString();
  const timeZone = "Africa/Algiers";
  const zonedDate = toZonedTime(new Date(), timeZone);
  const expire = new Date(zonedDate);
  expire.setHours(expire.getHours() + 2);

  const data = await databases.createDocument(
    config.database,
    config.verificationToken,
    ID.unique(),
    {
      account,
      token,
      expire,
      type,
    }
  );

  if (data) {
    return data;
  }
};

export const verifyAccountOtp = async (otp: string, accountId: string) => {
  const data = await databases.listDocuments(
    config.database,
    config.verificationToken,
    [Query.and([Query.equal("token", otp), Query.equal("account", accountId)])]
  );
  if (data.documents[0]) {
    const timeZone = "Africa/Algiers";
    const currentDate = toZonedTime(new Date(), timeZone);
    const expire = data.documents[0].expire;
    const expireDateFormat = format(expire, "yyyy-MM-dd HH:mm:ss");
    const currentDateFormat = format(currentDate, "yyyy-MM-dd HH:mm:ss");

    if (expireDateFormat < currentDateFormat) {
      throw new Error("token expired");
    } else {
      const data = await updateVerification(accountId);
      if (data) {
        const response = await deleteOldToken(accountId);
        return response;
      }
    }
  } else {
    throw new Error("token does not exist");
  }
};

export const verifyPasswordOtp = async (otp: string, accountId: string) => {
  const data = await databases.listDocuments(
    config.database,
    config.verificationToken,
    [
      Query.and([
        Query.equal("token", otp),
        Query.equal("account", accountId),
        Query.equal("type", "password"),
      ]),
    ]
  );
  if (data.documents[0]) {
    const timeZone = "Africa/Algiers";
    const currentDate = toZonedTime(new Date(), timeZone);
    const expire = data.documents[0].expire;
    const expireDateFormat = format(expire, "yyyy-MM-dd HH:mm:ss");
    const currentDateFormat = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    if (expireDateFormat < currentDateFormat) {
      throw new Error("token expired");
    } else {
      const response = await deleteOldToken(accountId);
      return response;
    }
  } else {
    throw new Error("token does not exist");
  }
};

export const updateVerification = async (id: string) => {
  const data = await databases.updateDocument(
    config.database,
    config.account,
    id,
    {
      verified: true,
    }
  );
  return data;
};

export const deleteOldToken = async (id: string) => {
  try {
    const data = await databases.listDocuments(
      config.database,
      config.verificationToken,
      [Query.equal("account", id)]
    );

    if (data) {
      const id = data.documents[0].$id;
      const response = await databases.deleteDocument(
        config.database,
        config.verificationToken,
        id
      );

      return response;
    }
  } catch (error) {}
};

export const getEmail = async (id: string) => {
  try {
    const data = await databases.getDocument(
      config.database,
      config.account,
      id,
      [Query.select(["email"])]
    );

    return data.email;
  } catch (error) {}
};

export const sendVerificationCode = async (
  code: string,
  email: string,
  type: "password" | "account"
) => {
  const formData = new FormData();
  formData.append("code", code);
  formData.append("email", email);
  let apiUrl;
  if (type === "account") {
    apiUrl = "https://www.cridi.online//api/verification";
  } else {
    apiUrl = "https://www.cridi.online//api/reset-password";
  }
  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "cridi-api-key": "Bearer BgxqrbIZLDNclkWJwQVEyqsHFxs0upiQ",
      },
    });

    console.log("Response:", response.data);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getSubscription = async (user: string) => {
  try {
    const data = await databases.listDocuments(
      config.database,
      config.subscriptin,
      [Query.equal("user", user), Query.limit(1), Query.orderDesc("$createdAt")]
    );
    const subscription: SubscriptionType = {
      type: data.documents[0].type,
      expire: format(data.documents[0].subscriptionDate, "yyyy-MM-dd"),
    };

    return subscription;
  } catch (error) {}
};

export const createSupplier = async (
  account: string,
  supplier: SupplierType
) => {
  const { description, field, state } = supplier;
  const data = await databases.createDocument(
    config.database,
    config.supplier,
    ID.unique(),
    {
      account,
      state: state.id,
      field: field.id,
      description,
    }
  );

  const newSupplier: SupplierType = {
    id: data.$id,
    field: data.field,
    state: data.state,
    description: data.description,
  };

  return newSupplier;
};

export const updateSupplier = async (supplier: SupplierType) => {
  const { description, field, state, id } = supplier;
  const data = await databases.updateDocument(
    config.database,
    config.supplier,
    id,
    {
      state: state.id,
      field: field.id,
      description,
    }
  );

  const updatedSupplier: SupplierType = {
    id: data.$id,
    field:
      supplierFields.find((item) => item.id === data.field) ||
      supplierFields[0],
    state: states.find((item) => item.id === data.state) || states[0],
    description: data.description,
  };

  return updatedSupplier;
};
