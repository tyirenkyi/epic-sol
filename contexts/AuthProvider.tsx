import { createContext, ReactElement, useState } from "react";

interface IAuthContext {
  user: any,
  updateUser: (newUser: any) => void
}

const defaultState: IAuthContext = {
  user: null,
  updateUser: () => {}
}

export const AuthContext = createContext<IAuthContext>(defaultState);

const AuthProvider = ({children} : { children: ReactElement }) => {
  const [user, setUser] = useState(defaultState.user);

  const updateUser = (newUser: any) => {
    setUser(newUser);
  }

  return (
    <AuthContext.Provider value={{user, updateUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
