import React, { createContext, useEffect, useState } from 'react';
import { SECRET_KEY } from '../utils/Containts';
import CryptoJS from "crypto-js";
export const ContextAuth = createContext()

export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState({});
    useEffect(() => {
        setIsLogin(getLocal("isLogin"));
       },[]);

    const saveLocal = (key, value) => {
        try {
           // Mã hóa bằng AES
            const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
            localStorage.setItem(key, encryptedValue);
            setIsLogin(value);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };
    // Hàm giải mã để lấy lại dữ liệu từ localStorage
   const getLocal = (key) => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
  
      // Giải mã AES
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };
 const logout = () => {
    setIsLogin(null);
     localStorage.removeItem("isLogin");
 }
 const updateUserProfile = (newProfile) => {
    setIsLogin((prev) => ({ ...prev, ...newProfile }));
};
    return (
        <ContextAuth.Provider value={{isLogin, saveLocal, logout, updateUserProfile}}>
            {children}
        </ContextAuth.Provider>
    );
}

export default AuthProvider;