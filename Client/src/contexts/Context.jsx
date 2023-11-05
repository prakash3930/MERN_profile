/* eslint-disable react/prop-types */
import { useState, createContext, useContext, useEffect } from "react";
import  axios  from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userId: "",
        userName: "",
        role:"",
        userEmail:"",
        token: "",
        img:"",
        imgType:""
    });

// configer .....
axios.defaults.baseURL = import.meta.env.VITE_API;
axios.defaults.headers.common["token"] = auth.token;

useEffect(() => {
    const data = localStorage.getItem("AUTH");
    if(data){
        const parsed = JSON.parse(data);
        setAuth({...auth,userId:parsed?.usrId,userEmail:parsed?.email,token:parsed?.userToken,role:parsed?.role,userName:parsed?.name,img:parsed?.img,imgType:parsed?.imgType});
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };