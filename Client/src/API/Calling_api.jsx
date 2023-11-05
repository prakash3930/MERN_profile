import axios from 'axios';
import { toast } from 'sonner';


export const registration = async (value) => {
    try {
        let {data} = await axios.post("/registration",value);
        if(data?.status === "Fail"){
            toast?.error(data?.message)
        }else{
            return data
        }
    } catch (e) {
        return []; 
    }
};

export const login = async (value) => {
    try {
        let {data} = await axios.post("/login",value);
        if(data?.status === "Fail"){
            toast?.error(data?.message)
        }else{
            return data
        }
    } catch (e) {
        return []; 
    }
};


export const getUser = async (token) => {
    try {
        let {data} = await axios.get("/get-profile",{headers:token});
        if(data?.status === "Fail"){
            toast?.error(data?.message)
        }else{
            return data
        }
    } catch (e) {
        return []; 
    }
};


export const updateProfile = async (value) => {
    try {
        let {data} = await axios.post("/update-profile",value);
        if(data?.status === "Fail"){
            toast?.error(data?.message)
        }else{
            return data
        }
    } catch (e) {
        return []; 
    }
};


export const updatePassword = async (value) => {
    try {
        let {data} = await axios.post("/update-pasword",value);
        if(data?.status === "Fail"){
            toast?.error(data?.message)
        }else{
            return data
        }
    } catch (e) {
        return []; 
    }
};


export const deleteUserr = async () => {
    try {
        let {data} = await axios.post("/delete-profile");
        if(data?.status === "Fail"){
            toast?.error(data?.message)
        }else{
            return data
        }
    } catch (e) {
        return []; 
    }
};