import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/Context";
import img from '../assets/img/undraw_pic_profile_re_7g2h.svg'

const Manu = () => {

    const [auth] = useAuth();



    return (
        <div className="container m-auto border flex justify-between p-2 capitalize items-center">
            <div className="left">
                <NavLink to="/"><h1>demo</h1></NavLink>
            </div>
            <div className="right">
                {
                    auth?.token ? <NavLink to='/profile'>
                    <figure className="w-11 h-11 rounded-full border border-red-300">
                        <img className="h-full w-full rounded-full"  src={img} alt="demo"/>
                    </figure>
                </NavLink>:<NavLink to='/login'><button className="bg-green-500 px-4 py-1 rounded-md">login</button></NavLink>
                }
                
                 
            </div>
        </div>
    );
};

export default Manu;