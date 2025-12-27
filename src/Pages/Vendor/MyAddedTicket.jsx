import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyAddedTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["vendorTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor` );
      return res.data;
    },
  });


  const handleDelete = async (id) => {
    await axiosSecure.delete(`/ticket/${id}`);
    toast.success("Ticket deleted!");
    refetch();
  };
  const handleUpdate = async (id) => {
    await axiosSecure.put(`/update/${id}`);
    toast.success("Ticket updated!");
    refetch();
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6">
      {tickets.map((ticket) => (
        <div key={ticket._id} className="card bg-base-200 shadow-xl">
          <img src={ticket.image} className="h-48 w-full rounded transition transform duration-300  hover:scale-103" />

          <h2 className="text-lg font-bold mt-2">{ticket.Ticket_title}</h2>
          <p>{ticket.From} → {ticket.To}</p>
          <p>Transport: {ticket.Transport}</p>
          <p>Price: ${ticket.Price}</p>
          <p>Status: 
            <span className={`ml-3 items-center font-medium py-3 badge ${ticket.status === "approved" ? "badge-success " : ticket.status === "rejected" ? "badge-error" : "badge-warning"}`}>
              {ticket.status}
            </span>
          </p>

          <div className="flex justify-between mt-3 gap-14">
            <Link to={`/dashboard/vendor/update/ticket/${ticket._id}`}
              disabled={ticket.status === "rejected"}
              className="btn btn-info btn-active flex-1 "
              onClick={()=>handleUpdate(ticket._id)}
            >
              Update
            </Link>

            <button
              disabled={ticket.status === "rejected"}
              className="btn btn-error btn-active flex-1 "
              onClick={() => handleDelete(ticket._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddedTicket;
