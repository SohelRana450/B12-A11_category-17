

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Ticket from "../components/Ticket";
import { Typewriter } from "react-simple-typewriter";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";

const LatestTicket = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/tickets");
      return result.data;
    },
    enabled: !!user, 
  });

  if (!user) {
    return (
      <div className="bg-base-200 py-16 mt-20 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">
          Please login to view latest tickets
        </h2>
        <p className="text-gray-600 mb-6">
          Access exclusive travel tickets and special tickets after logging in.
        </p>

        <Link to="/auth/login">
          <button className="btn btn-primary btn-wide">Login Now</button>
        </Link>
      </div>
    );
  }


  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-3 text-gray-500">Loading latest tickets…</p>
      </div>
    );
  }

 
  if (tickets.length === 0) {
    return (
      <div className="bg-base-200 py-16 mt-20 rounded-xl text-center">
        <h2 className="text-2xl font-semibold text-gray-500">
          No latest tickets available right now
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-base-200 py-10 mt-20 px-3 rounded-xl">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-purple-500 mb-10 leading-tight">
        Latest Tickets Section{" "}
        <span className="text-yellow-400">
          <Typewriter
            words={["Best travel deals", "Fresh tickets available now"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {tickets.map((ticket) => (
          <Ticket key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default LatestTicket;
