import { useState } from "react";
import { toast } from "sonner";
import { updatePassword } from "../API/Calling_api";

const PasswordUpdate_components = () => {

    const [input,setInput] = useState({oldPassword:"",password:""});


    const onSubmit = async(e)=>{
        e.preventDefault();

        if(input.oldPassword.length == 0){
            return toast.error('oldPassword is require')
         }else if(input.password.length == 0){
            return toast.error('password is require')
         }else if(input.password.length < 8){
            return toast.error('min 8 charactar');
         }else if(input.password.length > 35){
            return toast.error("password is long....")
         }else if(input.oldPassword.length > 35){
            return toast.error("password is long....")
         }else{
            const data = await updatePassword(input);
            setInput({oldPassword:"",password:""});
            toast?.success(data?.message);
         }
    };



    return (
        <div className="p-5">
              <label htmlFor="name">old password:</label><br />
                <input value={input.oldPassword} onChange={(e)=>{setInput({...input,["oldPassword"]:e.target.value})}} className="border border-green-500 p-2" type="password" autoFocus placeholder="inter your old password" /><br /><br />
                <label htmlFor="name">new password:</label><br />
                <input value={input.password} onChange={(e)=>{setInput({...input,["password"]:e.target.value})}} className="border border-green-500 p-2" type="password" placeholder="inter your new password" /><br /><br />
                <input onClick={onSubmit} className="bg-green-500 px-3 mb-2 py-2 rounded-md cursor-pointer" type="submit" value="update"/>
        </div>
    );
};

export default PasswordUpdate_components;