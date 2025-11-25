
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
const ProtectRoutes = () => {
    const {userData} = useSelector((store)=>store.user);
    
    

    return userData ? <>
        <Navbar />
        <Outlet />

    </> : <Navigate to="/" replace />


}
export default ProtectRoutes