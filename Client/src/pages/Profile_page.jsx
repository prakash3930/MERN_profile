import { NavLink, Outlet } from "react-router-dom";

const Profile_page = () => {
    return (
        <div className="container m-auto flex mt-5">
            <div className="left w-1/6 mr-5">
                <div className="left-content border border-red-300">
                        <NavLink to="/profile"><button className="bg-green-300 w-full p-2 mb-2  text-base capitalize">profile</button></NavLink>
                        <NavLink to="/profile/profile-update"><button className="bg-green-300 w-full p-2 mb-2 text-base capitalize">update profile</button></NavLink>
                        <NavLink to="/profile/update-password"><button className="bg-green-300 w-full p-2 mb-2 text-base capitalize">update password</button></NavLink>
                </div>
            </div>
            <div className="right w-5/6">
                <div className="right-content border border-red-300">
                        <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Profile_page;