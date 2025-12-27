import React from 'react';
import { Navigate} from 'react-router';
import Pending from '../components/Pending';
import useRole from '../Hooks/useRole';

const VendorRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole()
    if(isRoleLoading){
        return <Pending/>
    }

    if(role === 'vendor'){
        return (children);
    }
    return <Navigate to="/"></Navigate>
};

export default VendorRoute;