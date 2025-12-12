
import React, { useState } from "react";
import { BiListCheck, BiPlusCircle, BiWallet } from "react-icons/bi";
import { FaClipboardList, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

const VendorSidebar =() =>{
  const [open, setOpen] = useState(false);

  

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50  z-40 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div
        className={`fixed  left-6 top-19 right-10 rounded-xl   bg-gray-900 text-white p-6 z-50 transform transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="dropdown text-xl font-bold">Vendor Dashboard</h1>
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 active:scale-90 transition"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav  onClick={() => setOpen(false)} className="space-y-3 menu menu-vertical dropdown-left">
         
          <NavLink to="/dashboard/vendor/profile" className="flex gap-2 items-center"><FaUser size={18} />Vendor Profile   </NavLink>
          <NavLink to="/dashboard/vendor/add-ticket" className="flex gap-2 items-center"><BiPlusCircle size={18} /> Add Ticket   </NavLink>
          <NavLink to="/dashboard/vendor/my-tickets" className="flex gap-2 items-center"><BiListCheck size={18} />My Added Tickets   </NavLink>
          <NavLink to="/dashboard/vendor/requests" className="flex gap-2 items-center"><FaClipboardList size={18} />Requested Bookings   </NavLink>
          <NavLink to="/dashboard/vendor/revenue" className="flex gap-2 items-center"><BiWallet size={18} />Revenue Overview   </NavLink>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-xl font-bold">Vendor Dashboard</h1>
        <nav className="space-y-3">
          <NavLink to="/dashboard/vendor/profile" className="flex gap-2 items-center"><FaUser size={18} />Vendor Profile   </NavLink>
          <NavLink to="/dashboard/vendor/add-ticket" className="flex gap-2 items-center"><BiPlusCircle size={18} /> Add Ticket   </NavLink>
          <NavLink to="/dashboard/vendor/my-tickets" className="flex gap-2 items-center"><BiListCheck size={18} />My Added Tickets   </NavLink>
          <NavLink to="/dashboard/vendor/requests" className="flex gap-2 items-center"><FaClipboardList size={18} />Requested Bookings   </NavLink>
          <NavLink to="/dashboard/vendor/revenue" className="flex gap-2 items-center"><BiWallet size={18} />Revenue Overview   </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="md:hidden flex flex-col gap-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition active:scale-90"
            onClick={() => setOpen(true)}
          >
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white transition" />
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white transition" />
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white transition" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vendor Panel</h2>
        </div>

        {/* Main Page Content Slot */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md  min-h-[500px] ">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
export default VendorSidebar;