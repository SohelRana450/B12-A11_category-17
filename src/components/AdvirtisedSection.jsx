


import React from "react";
import { useQuery } from "@tanstack/react-query";
import Advirtised from "./Advirtised";
import { Typewriter } from "react-simple-typewriter";
import Marquee from "react-fast-marquee";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";

const AdvirtisedSection = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  
  const { data: advertised = [], isLoading } = useQuery({
    queryKey: ["advertised-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advirtised-tickets");
      return res.data;
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="my-20 text-center bg-base-200 py-16 rounded-xl shadow">
        <h2 className="text-4xl font-bold mb-4 text-indigo-600">
          Login to see exclusive advertised offers
        </h2>

        <p className="text-gray-600 mb-6 text-lg">
          Unlock special tickets, featured tickets, and flash deals.
        </p>

        <Link to="/auth/login">
          <button className="btn btn-primary btn-wide">
            Login Now
          </button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-3 text-gray-500">Loading advertised tickets…</p>
      </div>
    );
  }

  if (advertised.length === 0) {
    return (
      <div className="my-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-500">
          No advertised tickets available right now
        </h2>
      </div>
    );
  }


  return (
    <div className="my-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-indigo-500 mb-10">
        Advertisement Section{" "}
        <span className="text-yellow-400">
          <Typewriter
            words={["Best travel deals for you!", "Save more. Travel more."]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </span>
      </h2>

      <Marquee pauseOnHover speed={60} gradient={false}>
        {advertised.map((item) => (
          <div key={item._id} className="mx-4">
            <Advirtised advirtise={item} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default AdvirtisedSection;
