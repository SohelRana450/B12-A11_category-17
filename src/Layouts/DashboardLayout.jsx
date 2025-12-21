import React from 'react';
import VendorSidebar from '../components/VendorSidebar';
import UserSidebar from '../components/UserSidebar';

const DashboardLayout = () => {
    return (
        <div>
           
            <UserSidebar/>
            <VendorSidebar/>
        </div>
    );
};

export default DashboardLayout;