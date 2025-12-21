


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TicketCard from "../../components/TicketCard";

const BookedTickets = () => {
  const { data: payTickets = [], isLoading } = useQuery({
    queryKey: ["pay-tickets"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/pay-tickets`
      );
      return result.data;
    },
  });
  

  if (isLoading) return <p className="text-center py-10">Loading your bookings...</p>;

  return (
    <div className="bg-base-300 p-8 rounded-3xl min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">My Booked Tickets</h2>
      {payTickets.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-4">No bookings found</p>
          <a href="/tickets" className="btn btn-primary">Browse Tickets</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payTickets.map((ticket) => (
            <TicketCard 
              key={ticket._id} 
              ticket={ticket}
             
              // ✅ Pass as prop correctly
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTickets;
