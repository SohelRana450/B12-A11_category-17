import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure()
  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets-list`);
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/tickets/approve/${id}`);
    refetch();
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/tickets/reject/${id}`);
    refetch();
  };

  return (
   <div className="">
    <div className="mb-6 px-8 md:px-0 ">
        <h2 className="text-2xl font-bold ">Manage Tickets</h2>
        <p className="">Total Tickets: {tickets.length}</p>
         <span className="block w-23 h-0.5 bg-gray-300  " />
   
    </div>
    <div className="overflow-x-auto w-150 mx-auto  md:w-full px-0">
       <table className="border  border-gray-400 w-full divide-y divide-gray-200">
    
          <thead className="bg-gray-50 text-center  ">
            <tr>
              <th className=" px-2 py-3 font-medium text-gray-900">Title</th>
              <th className=" px-2 py-3 font-medium text-gray-900">Vendor</th>
              <th className=" px-2 py-3 font-medium text-gray-900">From → To</th>
              <th className="px-2 py-3 font-medium text-gray-900">Status</th>
              <th className=" px-2 py-3 font-medium text-gray-900 text-center">Actions</th>
            </tr>
          </thead>
     

      <tbody className="divide-y divide-gray-400 table-xs md:table-md">
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td className="whitespace-nowrap px-4 py-3 font-normal">{ticket.Ticket_title}</td>
            <td className="whitespace-nowrap px-4 py-3 ">{ticket.Vendor_data.email}</td>
            <td className="whitespace-nowrap px-4 py-3 ">{ticket.From} → {ticket.To}</td>
            <td className="whitespace-nowrap px-4 py-3 font-medium ">
               <span className={`inline-flex items-center justify-center font-medium rounded-full px-2.5 py-0.5 ${
                    ticket.status === 'approved' ? 'bg-blue-100 text-blue-700' : 
                   ticket.status === 'rejected' ? 'bg-purple-100 text-purple-700' :'bg-gray-100 text-gray-700'
                  }`}>
                   {ticket.status}  
                  </span>
             </td>

            <td className="flex gap-2  mx-2 whitespace-nowrap px-4 py-3 ">
            
               <button
                    onClick={() => handleApprove(ticket._id)}
                    disabled={ticket.status === 'approved'}
                    className="inline-block rounded bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:bg-gray-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>handleReject(ticket._id)}
                    disabled={ticket.status === 'rejected'}
                    className="inline-block rounded bg-rose-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700 disabled:bg-gray-300"
                  >
                   Rject
                  </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
    </div>
   </div>
  );
};

export default ManageTickets;
