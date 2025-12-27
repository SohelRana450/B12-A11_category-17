
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Pending from "../../components/Pending";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const RequestBooking = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  const { data: requests = [], refetch ,isLoading } = useQuery({
    queryKey: ["request-bookings"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/request-bookings`
      );
      return result.data;
    },
  });


  const handleAction = async (id, status) => {
    try {
      
      await axiosSecure.patch(`/bookings/${id}`, { status });
      
      
      queryClient.invalidateQueries({
        queryKey: ["request-bookings"]
      });
      refetch()
    } catch (error) {
      alert(error,"Failed to update booking status");
    }
  };
  const handleReject = async (id, status) => {
    try {
      
      await axiosSecure.patch(`/bookings/reject/${id}`, { status });
      refetch()
      toast.success('reject')
    } catch (error) {
      alert(error,"Failed to update booking status");
    }
  };

  if (isLoading) {
    return (
      <Pending/>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Booking Requests ({requests.length})
      </h2>
      
      {requests.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="avatar">
            <div className="w-24 mask mask-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
          <p className="text-xl mt-4 mb-4">No pending booking requests</p>
          <p className="text-sm">Users will appear here when they book your tickets</p>
        </div>
      ) :(
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Ticket</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((booking) => (
                <tr key={booking._id} className="transition-colors">
                  <td>
                    <div className="font-semibold">{booking.customer?.name || "N/A"}</div>
                  </td>
                  <td className="text-sm">
                    {booking.customer?.email}
                  </td>
                  <td className="font-medium">
                    {booking.ticketTitle}
                  </td>
                  <td className="font-semibold">{booking.quantity}</td>
                  <td className="font-bold text-primary">
                    ৳{(booking.totalPrice || booking.quantity * booking.unitPrice)?.toLocaleString()}
                  </td>
               
                  
                   <td className="whitespace-nowrap px-4 py-3 space-x-2 text-center transition-colors">
                    {/* <button
                    onClick={() => handleAction(booking._id,"accepted")}
                    disabled={booking.status === 'accepted'}
                    className="inline-block rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:bg-gray-300"
                  >
                   ✅ Accept
                  </button>
                 
                  <button
                    onClick={() => handleReject(booking._id,"rejected")}
                    disabled={booking.status === 'rejected'}
                    className="inline-block rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:bg-gray-100"
                  >
                   ❌ Reject
                  </button> */}

                   <button
                    onClick={() => handleAction(booking._id,"accepted")}
                    disabled={booking.status === 'accepted'}
                    className="inline-block rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(booking._id,"rejected")}
                    disabled={booking.status ===("rejected")}
                    className="inline-block rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700  disabled:bg-gray-300"
                  >
                    Reject
                  </button>
                  
                  
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
   </div>
    )
};

export default RequestBooking;
