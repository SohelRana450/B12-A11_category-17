

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");
  const [isTimePassed, setIsTimePassed] = useState(false);


  const { data: ticket = {}, isLoading, error } = useQuery({
    queryKey: ["ticket-details", id],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/all-tickets/${id}`);
      return result.data;
    },
  });

  
  const { 
    image, 
    Perks, 
    Price, 
    Ticket_title, 
    Ticket_quantity = 0, 
    From, 
    To, 
    Transport, 
    Time, 
    Vendor_data 
  } = ticket;

 
  useEffect(() => {
    if (!Time) return;

    const interval = setInterval(() => {
      const diff = new Date(Time) - new Date();
      
      if (diff <= 0) {
        setCountdown("Departure time has passed");
        setIsTimePassed(true);
        clearInterval(interval);
      } else {
        setIsTimePassed(false);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        setCountdown(
          days > 0 
            ? `${days}d ${hours}h ${minutes}m ${seconds}s` 
            : `${hours}h ${minutes}m ${seconds}s`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [Time]);


  const isSoldOut = Ticket_quantity <= 0;
  const isDisabled = isSoldOut || isTimePassed || !ticket;


  const bookingMutation = useMutation({
    mutationFn: (bookingData) => 
      axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData),
    
    onSuccess: () => {
      toast.success("Booking Successful!");
      setShowModal(false);
      
     
      queryClient.invalidateQueries({ queryKey: ["ticket-details", id] });
      setTicketQuantity(1);
    },
    
    onError: (err) => 
      toast.error(err.response?.data?.message || "Booking failed! Try again."),
  });

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!ticket || ticketQuantity > Ticket_quantity || ticketQuantity <= 0) {
      toast.error(`Only ${Ticket_quantity || 0} tickets available!`);
      return;
    }

    const bookingData = {
      ticketId: id,
      ticketTitle: Ticket_title,
      quantity: ticketQuantity,
      unitPrice: Price,
      totalPrice: Price * ticketQuantity,
      From,
      To,
      image,
      Time,
      vendorEmail: Vendor_data?.email,
      status: "Pending",
      bookingTime: new Date().toISOString(),
    };

    bookingMutation.mutate(bookingData);
  };

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading ticket details...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Ticket not found</h2>
        <p>Could not load ticket details. <a href="/" className="text-indigo-600 hover:underline">Browse tickets</a></p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white shadow-2xl rounded-3xl">
      <div className="flex flex-col md:flex-row gap-10">
        <img 
          src={image} 
          alt={Ticket_title} 
          className="md:w-1/2 rounded-2xl h-96 object-cover" 
        />
        
        <div className="md:w-1/2 space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">{Ticket_title}</h2>
            <div className="flex gap-2 mt-2">
              <span className="block w-20 h-0.5 bg-gray-700" />
              <span className="block w-16 h-0.5 bg-yellow-400" />
              <span className="block w-20 h-0.5 bg-gray-700" />
            </div>
          </div>

          <div className="text-gray-600 space-y-2">
            <p><b>Transport:</b> {Transport} | <b>Perks:</b> {Perks}</p>
            <p><b>Route:</b> {From} → {To}</p>
            <p className="text-2xl font-bold text-indigo-600">Price: ৳{Price}</p>
            <p><b>Available Tickets:</b> <span className={isSoldOut ? 'text-red-600' : 'text-green-600'}>{Ticket_quantity}</span></p>
          </div>

          <div className="p-6 bg-red-50 rounded-xl border-2 border-red-100 text-center">
            <p className="text-xl font-bold text-red-600">{countdown}</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={isDisabled}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-200 ${
              isDisabled 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isTimePassed 
              ? "🚫 Booking Closed" 
              : isSoldOut 
                ? "❌ Sold Out" 
                : "🎫 Book Now"
            }
          </button>
        </div>
      </div>

      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Confirm Booking</h3>
            
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Quantity (Available: {Ticket_quantity})
                </label>
                <input
                  type="number"
                  min="1"
                  max={Ticket_quantity}
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full border-2 p-4 rounded-xl text-lg outline-indigo-500 focus:border-indigo-400 transition-all"
                  required
                  disabled={isDisabled}
                />
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
                <div className="flex justify-between items-center text-xl font-bold text-indigo-800">
                  <span>Total Amount:</span>
                  <span>৳{Price * ticketQuantity}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-600 transition-all"
                  disabled={bookingMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingMutation.isPending || isDisabled}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {bookingMutation.isPending ? "⏳ Confirming..." : "✅ Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Details;
