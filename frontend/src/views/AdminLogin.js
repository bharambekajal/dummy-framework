import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/admin/login');
    });
    return <></>;
}
export default AdminLogin
