import React, {createContext, useCallback, useContext} from 'react';

interface AuthContextData {
  name: string;
  signIn(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
  const signIn = useCallback(() => {
    console.log('signIn')
  }, [])
  
  return (
    <AuthContext.Provider value={{ name: 'Diego', signIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}
