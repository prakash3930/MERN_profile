import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { login } from "../API/Calling_api";
import { useAuth } from "../contexts/Context";

const Login_page = () => {

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const [input,setInput] = useState({email:"",password:""});

    if(input.password.length > 35){
        toast.error("password is long....")
    }

    const onSubmit = async(e)=>{
        e.preventDefault();
        if(input.email.length ==0){
           return toast.error('email is require');
        }else if(input.password.length ==0){
           return toast.error('password is require')
        }else if(input.password.length < 8){
           return toast.error('min 8 charactar');
        }else if(input.password.length > 35){
           return toast.error("password is long....")
        }else{
            const data = await login(input);
            localStorage.setItem("AUTH",JSON.stringify({usrId:data.data._id,userToken:data.token,name:data.data.name,email:data.data.email,role:data.data.role,img:data.data.photo.data.data,imgType:data.data.photo.contentType}));

            setAuth({...auth,userId:data.data._id,userEmail:data.data.email,token:data.token,role:data.data.role,userName:data.data.name,img:data.data.photo.data.data,imgType:data.data.photo.contentType});

            navigate('/');
            toast?.success(data?.message);
        }
    };


    
    return (
        <div className="container m-auto">
            <form onSubmit={onSubmit} className="mt-5">
                <input onChange={(e)=>{setInput({...input,["email"]:e.target.value})}} className="border border-green-500 p-2" type="email" autoFocus placeholder="inter your email" /><br /><br />
                <input onChange={(e)=>{setInput({...input,["password"]:e.target.value})}} className="border border-green-500 p-2" type="password" placeholder="inter your password" /><br /><br />
                <input className="bg-green-500 px-3 mb-2 py-2 rounded-md cursor-pointer" type="submit" value="submit"/>
            </form>
            <h1 className="capitalize">dont have an account <NavLink to="/registar"><span className="cursor-pointer text-red-500 uppercase">registar</span></NavLink></h1>
        </div>
    );
};

export default Login_page;