
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Advirtised from "./Advirtised";
import { Typewriter } from "react-simple-typewriter";
import Marquee from "react-fast-marquee";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const AdvirtisedSection = () => {
  const axiosSecure = useAxiosSecure()
  const { data: advertised = [] } = useQuery({
    queryKey:["advertised-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advirtised-tickets`);
      return res.data;
    },
  });

  

  return (
    <div className="my-20">
      <Marquee>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-indigo-500 mb-10 leading-tight">
        Advertisement Section{" "}
        <span className="text-yellow-400">
          <Typewriter
            words={[""]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </span>
      </h2>
      </Marquee>
   
     <div className=" ">
       <Marquee pauseOnHover={true} speed={70} >

          {advertised.map((advertise) => (
            <div className="overflow-y-hidden overflow-x-hidden ">

              
              <Advirtised key={advertise._id} advirtise={advertise} />
              </div>
          ))}
          </Marquee>
    </div>
    </div>
  );
};

export default AdvirtisedSection;

