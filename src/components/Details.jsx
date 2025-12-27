

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import Modal from "./Modal";
import Pending from "./Pending";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Details = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()
  const [showModal, setShowModal] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");
  const [isTimePassed, setIsTimePassed] = useState(false);


 
  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ["ticket-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-tickets/${id}`
      );
      return res.data;
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
    Vendor_data,
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
  const isDisabled = isSoldOut || isTimePassed;

  
  const bookingMutation = useMutation({
    mutationFn: (bookingData) =>
      axiosSecure.post(`/bookings`, bookingData),

    onSuccess: () => {
      toast.success("Booking Successful!");
      setShowModal(false);
      setTicketQuantity(1);
      queryClient.invalidateQueries({ queryKey: ["ticket-details", id] });
      navigate("/dashboard/user/booked-tickets");
    },

    onError: (err) =>
      toast.error(err.response?.data?.message || "Booking failed!"),
  });

  
  const handleBooking = (e) => {
    e.preventDefault();

    if (ticketQuantity <= 0) {
      return toast.error("Select at least 1 ticket");
    }

    if (ticketQuantity > Ticket_quantity) {
      return toast.error(`Only ${Ticket_quantity} tickets available`);
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
      Vendor_data,
      customer: {
        email: user?.email,
        image: user?.photoURL,
        name: user?.displayName,
      },
      status: "pending",
      bookingTime: new Date().toISOString(),
    };

    bookingMutation.mutate(bookingData);
  };


  if (isLoading) {
    return (<Pending/>);
  }

  


  return (
    <div className="max-w-6xl mx-auto my-12 p-6  shadow-2xl rounded-3xl">
      <div className="flex flex-col md:flex-row gap-10 items-center">
       <div className="w-full">
         <img
          src={image}
          alt={Ticket_title}
          className="w-full rounded-2xl"
        />
       </div>

        <div className="w-full space-y-6">
          <h2 className="text-4xl font-bold">{Ticket_title}</h2>

          <p>
            <b>Transport:</b> {Transport} | <b>Perks:</b> {Perks}
          </p>
          <p>
            <b>Route:</b> {From} → {To}
          </p>

          <p className="text-2xl font-bold text-indigo-600">Total Price: ৳{Price}</p>

          <p>
            <b>Available:</b>{" "}
            <span className={isSoldOut ? "text-red-600" : "text-green-600"}>
              {Ticket_quantity}
            </span>
          </p>

          <div className="p-4 bg-red-50 rounded-xl text-center">
            <p className="font-bold text-red-600">{countdown}</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={isDisabled}
            className={`w-full py-4 rounded-xl font-bold text-white ${
              isDisabled
                ? "bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isTimePassed ? "🚫 Booking Closed" : isSoldOut ? "❌ Sold Out" : "🎫 Book Now"}
          </button>
        </div>
      </div>

    
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleBooking} className="p-6 space-y-6">
            <h3 className="text-2xl font-bold">Confirm Booking</h3>

            <input
              type="number"
              min="1"
              max={Ticket_quantity}
              value={ticketQuantity}
              onChange={(e) =>
                setTicketQuantity(
                  Math.min(
                    Ticket_quantity,
                    Math.max(1, Number(e.target.value))
                  )
                )
              }
              className="w-full border p-3 rounded-xl"
            />

            <div className="font-bold text-xl">
              Total: ৳{Price * ticketQuantity}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={bookingMutation.isPending}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl"
              >
                {bookingMutation.isPending ? "⏳ Processing..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Details;
