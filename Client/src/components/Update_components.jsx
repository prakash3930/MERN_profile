import { useState } from "react";
// import img from "../assets/img/299783866_775398993606352_9206096809960034509_n.jpg";
import { toast } from 'sonner';
import { updateProfile } from "../API/Calling_api";
import { useAuth } from "../contexts/Context";

const Update_components = () => {

    const [input,setInput] = useState({photo:"",name:""});
    const [img,setImg] = useState({image:""});

    const [auth] = useAuth();

    if(input.name.length > 25){
        toast.error("name is long....");
    }

    const imgUrl = `data:${auth.imgType};base64,${btoa(new Uint8Array(auth?.img).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;

    const onSubmit = async(e)=>{
        e.preventDefault();
        const userData = new FormData();
        userData.append("photo", input.photo);
        userData.append("name", input.name);

        if(input.name.length > 25){
            return toast.error("name is long....");
        }else{
            const data = await updateProfile(userData);
            toast?.success(data?.message);
        }
    };


    return (
        <div>
            <div className="p-5">
           <div className="w-52 h-52 border rounded-full ml-5">
                <img className="w-full h-full" src={input.photo.length == 0 ? imgUrl : img.image} alt="demo" />
           </div>
           <div className="mt-5">
           <input onChange={(e)=>{setInput({...input,["photo"]:e.target.files[0]}),setImg({...img,["image"]:URL.createObjectURL(e.target.files[0])})}} className="border border-green-500 p-2 mb-2" type="file" autoFocus /><br />
           <label htmlFor="name">Name:</label><br />
               <input onChange={(e)=>{setInput({...input,["name"]:e.target.value})}} className="border border-green-500 p-2" type="text" autoFocus placeholder="prokash sarker" /><br /><br />
               <input onClick={onSubmit} className="bg-green-500 px-3 mb-2 py-2 rounded-md cursor-pointer" type="submit" value="update"/>
           </div>
        </div>
        </div>
    );
};

export default Update_components;