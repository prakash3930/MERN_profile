import { useEffect, useState } from "react";
// import img from "../assets/img/299783866_775398993606352_9206096809960034509_n.jpg"
import { getUser, deleteUserr } from "../API/Calling_api";
import { useAuth } from "../contexts/Context";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";


const Profile_components = () => {

    const [authh, setAuthh] = useState([]);
    const [auth, setAuth] = useAuth();

    const nabiget = useNavigate();

    useEffect((()=>{
        (async()=>{
            const data = localStorage.getItem("AUTH");
            const parsed = JSON.parse(data);
            const tokenUser = {token:parsed?.userToken};
            const datat = await getUser(tokenUser);
            setAuthh(datat.data);
        })()
    }),[])

    const logOut = async()=>{
       localStorage.removeItem("AUTH");
       setAuth({...auth, userId: "",
       userName: "",
       role:"",
       userEmail:"",
       token: "",
       img:"",
       imgType:""})
       nabiget('/')
       toast?.success("logout done.");
    };

    const deleteUser = async()=>{
        await deleteUserr();
        localStorage.removeItem("AUTH");
       setAuth({...auth, userId: "",
       userName: "",
       role:"",
       userEmail:"",
       token: "",
       img:"",
       imgType:""})
        toast?.success("delete profile done.");
        nabiget('/')
    }



    return (
        <div className="p-5">
           <div className="w-52 h-52 border rounded-full ml-5">
                <img className="w-full h-full"   src={`data:${authh?.photo?.contentType};base64,${btoa(new Uint8Array(authh?.photo?.data?.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`} alt="" />
           </div>
           <div>
                <h1 className="ml-5 text-lg mt-5">Name:{authh.name}</h1>
                <h3 className="ml-5 text-base mt-1">Email:{authh.email}</h3>
                <h3 className="ml-5 text-base mt-1">Type:{authh.role == 0 ? "user" :"admin"}</h3>
           </div>
           <button onClick={logOut} className="bg-green-500 px-3 py-1 text-base mt-3 ml-5 rounded-sm">log out</button>
           <button onClick={deleteUser} className="bg-green-500 px-3 py-1 text-base mt-3 ml-5 rounded-sm">delete user</button>
        </div>
    );
};

export default Profile_components;