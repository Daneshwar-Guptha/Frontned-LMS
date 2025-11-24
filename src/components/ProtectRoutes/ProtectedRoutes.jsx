import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const ProtectRoutes = () => {

    return Cookies.get("token") ? <>
        <Navbar />
        <Outlet />

    </> : <Navigate to="/" replace />


}
export default ProtectRoutes