import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Pending from '../../components/Pending';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const TransactionHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: ticketHistory = [], isLoading } = useQuery({
        queryKey: ["ticket-details", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/transaction-history`
          );
          return res.data;
        },
      });

      if(isLoading){
        return<Pending/>
      }

    return (
          <div className="w-11/12 md:w-full mx-auto ">
    

      <div className="mb-6">
        <h2 className="text-2xl font-bold ">Transaction History</h2>
        <p className="">Total Transaction: {ticketHistory.length}</p>
         <span className="block w-31 h-0.5 bg-gray-300  " />
   
    </div>

      
      <div className=" table-zabra table-sm md:table-md rounded-lg border border-gray-200 overflow-auto overflow-y-atuo  md:w-full">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className=" px-4 py-3 font-medium text-gray-900">Transaction ID</th>
              <th className=" px-4 py-3 font-medium text-gray-900">Price</th>
              <th className=" px-4 py-3 font-medium text-gray-900">Ticket Title</th>
              <th className=" px-4 py-3 font-medium text-gray-900 text-center">Payment Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {ticketHistory.map((history) => (
              <tr key={history._id} className="transition-colors">
                <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-900">{history.transactionId}</td>
                <td className="whitespace-nowrap px-3 py-3 text-gray-700">{history.price}</td>
                <td className="whitespace-nowrap px-3 py-3 text-gray-700">{history.ticketTitle}</td>
                <td className="whitespace-nowrap px-3 py-3"> {history.Payment_Date}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {ticketHistory.length === 0 && !isLoading && (
        <div className="text-center py-10 text-gray-500">No transaction history found.</div>
      )}
    </div>
    );
};

export default TransactionHistory;