import { createContext, useState } from "react"

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null
}

const AuthContext = createContext(defaultAuthContext)

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)

  return <AuthContext.Provider>
    value={{isAuthenticated, currentMember: payload}}
  </AuthContext.Provider>

}