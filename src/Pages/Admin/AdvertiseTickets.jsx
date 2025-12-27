

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure()
  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets-list`);
      return res.data;
    },
  });

  const handleToggle = async (ticket) => {
    try {
      await axiosSecure.patch(
        `/ticket/advertise/${ticket._id}`,
        { advertised: !ticket.advertised }
      );

      toast.success("Updated!");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Advertise Tickets</h2>

      <table className="table border w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Approved</th>
            <th>Advertised</th>
            <th>Toggle</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.Ticket_title}</td>

              <td>
                {ticket.status === 'approved' ? (
                  <span className="px-3 py-1 bg-green-200 rounded">Yes</span>
                ) : (
                  <span className="px-3 py-1 bg-red-200 rounded">No</span>
                )}
              </td>

              <td>
                {ticket.advertised === true ? (
                  <span className="px-3 py-1 bg-blue-200 rounded">Yes</span>
                ) : (
                  <span className="px-3 py-1 bg-gray-200 rounded">No</span>
                )}
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={ticket.advertised}
                  onChange={() => handleToggle(ticket)}
                  />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTickets;
