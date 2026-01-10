
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  
const axiosSecure = useAxiosSecure()

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin/users`);
      return data;
    },
  });

  const makeAdmin = async (email) => {
    try {
      await axiosSecure.patch(`/users/admin/${email}`);
      toast.success("User is now Admin!");
      refetch();
    } catch (err) {
      toast.error(err,"Failed to update role");
    }
  };

  const makeVendor = async (email) => {
    try {
      await axiosSecure.patch(`/users/vendor/${email}`);
      toast.success("User is now Vendor!");
      refetch();
    } catch (err) {
      toast.error(err,"Failed to update role");
    }
  };
  const makeCustomer = async (email) => {
    try {
      await axiosSecure.patch(`/users/customer/${email}`);
      toast.success("User is now Vendor!");
      refetch();
    } catch (err) {
      toast.error(err,"Failed to update role");
    }
  };

  const markFraud = async (email) => {
    try {
      await axiosSecure.patch(`/users/fraud/${email}`);
      toast.success("Vendor marked as fraud!");
      refetch();
    } catch (error) {
      toast.error(error,"Action failed");
    }
  };
  const unmarkFraud = async (email) => {
    try {
      await axiosSecure.patch(`/users/unfraud/${email}`);
      toast.success("Vendor marked as unfraud!");
      refetch();
    } catch (error) {
      toast.error(error,"Action failed");
    }
  };

  return (
    <div className="w-11/12 md:w-full mx-auto ">
    

      <div className="mb-6">
        <h2 className="text-2xl font-bold ">Manage Users</h2>
        <p className="">Total Users: {users.length}</p>
         <span className="block w-20 h-0.5 bg-gray-300  " />
   
    </div>

      
      <div className=" table-zabra table-sm md:table-md rounded-lg border border-gray-200 overflow-auto overflow-y-atuo  md:w-full">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className=" px-4 py-3 font-medium text-gray-900">Name</th>
              <th className=" px-4 py-3 font-medium text-gray-900">Email</th>
              <th className=" px-4 py-3 font-medium text-gray-900">Role</th>
              <th className=" px-4 py-3 font-medium text-gray-900 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.email} className="transition-colors">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{u.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">{u.email}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={`inline-flex items-center justify-center font-medium rounded-full px-2.5 py-0.5 ${
                    u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 
                    u.role === 'vendor' ? 'bg-purple-100 text-purple-700' : u.role === 'customer' ? 'bg-red-100 text-pink-700' :'bg-gray-100 text-gray-700'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 space-x-2 w-25  text-center">
                  <button
                    onClick={() => makeAdmin(u.email)}
                    disabled={u.role === 'admin'}
                    className="inline-block rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => makeVendor(u.email)}
                    disabled={u.role === 'vendor'}
                    className="inline-block rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:bg-gray-300"
                  >
                    Make Vendor
                  </button>
                  <button
                    onClick={() => makeCustomer(u.email)}
                    disabled={u.role === 'customer'}
                    className="inline-block rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:bg-gray-300"
                  >
                    Make Customer
                  </button>
                  <div className="flex gap-2 mt-1">
                    {u.role === "vendor" &&  (
                    <button
                      onClick={() => markFraud(u.email)}
                      className="block rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 "
                    >
                      Fraud
                    </button>
                  )}
                  {u.role === "vendor" && (
                    <button
                      onClick={() => unmarkFraud(u.email)}
                      className="block rounded bg-yell-600 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-700"
                    >
                      unFraud
                    </button>
                  )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && !isLoading && (
        <div className="text-center py-10 text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default ManageUsers;