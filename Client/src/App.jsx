
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home_page from './pages/Home_page';
import Error_page from "./pages/Error_page";
import Manu from './config/Manu';
import Login_page from "./pages/Login_page";
import Registration_page from "./pages/Registration_page";
import Profile_page from "./pages/Profile_page";
import Profile_components from "./components/Profile_components";
import Update_components from "./components/Update_components";
import PasswordUpdate_components from "./components/PasswordUpdate_components";


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Manu></Manu>
      <Routes>
        <Route path="/" element={<Home_page></Home_page>}></Route>
        <Route path="/login" element={<Login_page></Login_page>}></Route>
        <Route path="/registar" element={<Registration_page></Registration_page>}></Route>
        <Route path="/profile" element={<Profile_page></Profile_page>}>
              <Route path="/profile" element={<Profile_components></Profile_components>}></Route>
              <Route path="/profile/profile-update" element={<Update_components></Update_components>}></Route>
              <Route path="/profile/update-password" element={<PasswordUpdate_components></PasswordUpdate_components>}></Route>
        </Route>
        <Route path="*" element={<Error_page></Error_page>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;