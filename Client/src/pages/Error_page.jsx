import { NavLink } from "react-router-dom";

const Error_page = () => {
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <h1 className=" text-xl ">This is error page......</h1>
            <NavLink to="/"><button className="bg-green-500 p-2 rounded-md mt-5">Go To Home</button></NavLink>
        </div>
    );
};

export default Error_page;