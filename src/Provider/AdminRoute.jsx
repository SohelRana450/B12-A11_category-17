import React from 'react';
import { Navigate} from 'react-router';
import Pending from '../components/Pending';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole()
    if(isRoleLoading){
        return <Pending/>
    }

    if(role === 'admin'){
        return (children);
    }
    return <Navigate to="/"></Navigate>
};

export default AdminRoute;