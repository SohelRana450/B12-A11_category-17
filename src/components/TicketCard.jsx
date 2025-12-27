
import React, { useState, useEffect, useCallback } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const TicketCard = ({ ticket }) => {
  const {user} = useAuth()
  const targetTime = new Date(ticket.departureDateTime).getTime();
  const axiosSecure = useAxiosSecure()

  const getTimeLeft = useCallback(() => {
    const totalSeconds = Math.floor((targetTime - Date.now()) / 1000);
    if (totalSeconds <= 0) return { expired: true, days:0,hours:0,minutes:0,seconds:0 };
    return {
      days: Math.floor(totalSeconds / (60*60*24)),
      hours: Math.floor((totalSeconds % (60*60*24)) / (60*60)),
      minutes: Math.floor((totalSeconds % (60*60)) / 60),
      seconds: Math.floor(totalSeconds % 60),
      expired: false,
    };
  }, [targetTime]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const isExpired = timeLeft.expired;

  useEffect(() => {
    if (ticket.status === "rejected" || ticket.status === "paid" || isExpired) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [getTimeLeft, ticket.status, isExpired]);


  const handlePayment = async () => {
    const paymentInfo = {
      ticketId: ticket.ticketId,
      bookingId: ticket._id,
      ticketTitle: ticket.ticketTitle,
      unitPrice: ticket.unitPrice,
      totalPrice:  ticket.unitPrice *  ticket.quantity,
      quantity: ticket.quantity,
      status: ticket.status,
      departureDateTime: ticket.departureDateTime,
      image: ticket.image,
      vendor: ticket.Vendor_data,
      customer: {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
      }
    };
    const { data } = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    window.location.href = data.url;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
      <img src={ticket.image} alt={ticket.ticketTitle} className="h-48 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{ticket.ticketTitle}</h3>
      <p><span className="font-medium">From: </span>{ticket.from} → <span className="font-medium">To: </span>{ticket.to}</p>
      <p><span className="font-medium">Quantity:</span> {ticket.quantity}</p>
      <p><span className="font-medium">Total:</span> ৳{ticket.totalPrice?.toLocaleString()}</p>
      <p><span className="font-medium">Departure:</span> {(ticket.departureDateTime)}</p>
      <p><span className="font-medium">Status:</span>
        <span className={`ml-3 inline-flex items-center justify-center font-medium rounded-full px-2.5 py-0.5 ${
                    ticket.status === 'accepted' ? 'bg-blue-100 text-blue-700' : 
                   ticket.status === 'pending' ? 'bg-purple-100 text-purple-700' : ticket.status === 'paid' ? 'bg-red-100 text-pink-700' :'bg-gray-100 text-gray-700'
                  }`}>
                    {ticket.status}
                  </span>
      </p>

      { ticket.status === "rejected" && (
          <p className="font-bold text-gray-600 bg-cyan-300 text-center py-1 rounded-box  mx-8 mt-2">Rejected</p>
      )}
      { ticket.status === "paid" && (
          <p className="font-bold text-green-600 bg-amber-300 text-center py-1 rounded-box  mx-6 mt-2">Payment Completed</p>
      )}

      {!isExpired && ticket.status === "accepted" && (
        <button className="btn mt-2 bg-blue-500 text-white" onClick={handlePayment}>
          Pay Now (৳{ticket.totalPrice})
        </button>
      )}

      {!isExpired && ticket.status === "pending" && (
        <p className="text-red-500 mt-2 font-bold animate-pulse">Waiting for vendor approval...</p>
      )}

      {isExpired && <p className="text-gray-500 font-bold bg-red-200 text-center py-1 rounded-box  mx-6 mt-2">Booking expired</p>}

      <div>
        {!isExpired && ticket.status === "pending" && (
          <p className="font-medium text-black rounded-box bg-blue-200  py-2 text-center mt-1">Time: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
