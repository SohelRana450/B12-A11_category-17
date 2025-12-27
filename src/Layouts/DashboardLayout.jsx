import React from 'react';
import VendorSidebar from '../components/VendorSidebar';
import UserSidebar from '../components/UserSidebar';
import useRole from '../Hooks/useRole';
import AdminSidebar from '../components/AdminSidebar';
import Pending from '../components/Pending';

const DashboardLayout = () => {
    const [role,isRoleLoading] = useRole()
    if(isRoleLoading){
        return <Pending/>
    }
    return (
        <div>
            
           {role === "customer" && <UserSidebar/>}
            {role === "vendor" && <VendorSidebar/>}
            {role === "admin" && <AdminSidebar/>}
        </div>
    );
};

export default DashboardLayout;