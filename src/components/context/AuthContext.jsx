import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthenticateProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [expire, setExpire] = useState('')
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"



    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/get-current-user`, { withCredentials: true });
        
        if (response.data?.user) {
          setUser(response.data.user);
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);
        }
      } catch (err) {
        console.log('Auth check failed', err);
        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);   // MUST happen in finally
      }
    };
    
    
    

    const login = async (email, password) => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/login`, 
          { manager: { email, password } }, 
          { withCredentials: true }
        );
        setUser(response.data.user); // 
        setExpire(response.data.token.expires)
        setToken(response.data.token)
        setAuthenticated(true);  
        navigate('/dashboard')
        return response.data;
      } catch (e) {
        throw e
    }
  }
    
      

    const logout = async () => {
        try{
            const response = await axios.delete(`${apiUrl}/api/logout`, { withCredentials: true })
            setAuthenticated(false)
            setUser(null)
            navigate('/')
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
      checkAuthStatus();
    }, []);
    


    return (
        <AuthContext.Provider value={{login, user, logout, authenticated, checkAuthStatus, expire, token , loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}