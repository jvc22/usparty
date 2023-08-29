import { createContext, useContext, useState } from "react";

interface UserInfo {
  username: string;
}

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

export function UserContextProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
