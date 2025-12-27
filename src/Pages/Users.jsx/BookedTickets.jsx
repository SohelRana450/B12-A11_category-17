
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../../components/TicketCard";
import useAuth from "../../Hooks/useAuth";
import Pending from "../../components/Pending";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  
  const { data: payTickets = [], isLoading } = useQuery({
    queryKey: ["book-tickets",user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/book-tickets`);
      return result.data;
    },
  });

  if (isLoading) return <Pending/>;

  return (
    <div className="bg-base-100 py-8 rounded-3xl min-h-screen">
      <h2 className="text-3xl font-bold mb-8">My Booked Tickets({payTickets.length})</h2>
      {payTickets.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-4">No bookings found</p>
          <Link to="/all-tickets" className="btn btn-primary">Browse Tickets</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTickets;
