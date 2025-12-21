

import { useEffect, useState, useCallback } from "react";

const TicketCard = ({ ticket }) => {
  const {
    ticketTitle,
    image,
    quantity,
    totalPrice,
    from,
    to,
    departureDateTime,
    status,
  } = ticket;

  // Convert the departure string to a timestamp
  const targetTime =new Date((departureDateTime)).getTime();

  // Helper function to calculate time remaining
  const getTimeLeft = useCallback(() => {
    const totalSeconds = Math.floor((targetTime - Date.now()) / 1000);

    if (totalSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, };
    }

    return {
      days: Math.floor(totalSeconds / (60 * 60 * 24)),
      hours: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
      minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
      seconds: Math.floor(totalSeconds % 60),
      expired: false
    };
  }, [targetTime]);

  const [timeLeft, setTimeLeft] = useState(()=>getTimeLeft());

  useEffect(() => {
    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [getTimeLeft]);

  return (
    <div className="rounded-xl bg-white text-black shadow hover:shadow-md transition flex flex-col h-full">
      <img className="rounded-t-xl w-full h-48 object-cover" src={image} alt={ticketTitle} />

      <div className="px-4 py-3 space-y-1 flex-grow">
        <h3 className="text-lg font-semibold">{ticketTitle}</h3>

        <p className="text-sm"><b>Route:</b> {from} → {to}</p>
        <p className="text-sm"><b>Departure:</b> {(departureDateTime)}</p>
        <p className="text-sm"><b>Quantity:</b> {quantity}</p>
        <p className="text-sm"><b>Total:</b> ৳{totalPrice}</p>

        <p className="text-sm">
          <b>Status:</b>{" "}
          <span className={`font-bold capitalize ${
            status === "pending" ? "text-yellow-600" : 
            status === "accepted" ? "text-blue-600" : 
            status === "paid" ? "text-green-600" : "text-red-600"
          }`}>
            {status}
          </span>
        </p>

        {/* Countdown Logic */}
        {status !== "paid" && status !== "rejected" && !timeLeft.expired && (
          <div className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded mt-2">
            ⏳ Payment ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
        )}

        {timeLeft.expired && status !== "paid" && (
            <div className="text-xs font-bold text-gray-500 bg-gray-100 p-2 rounded mt-2">
                🚫 Booking Expired
            </div>
        )}
      </div>

      <div className="p-4 pt-0">
        {status !== "paid" && !timeLeft.expired && (
          <button className="btn btn-sm w-full bg-indigo-700 hover:bg-indigo-800 text-white border-0">
            Pay Now
          </button>
        )}

        {status === "paid" && (
          <div className="bg-green-100 text-green-700 py-2 rounded font-bold text-center text-sm">
            ✓ Payment Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
