import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Ticket from '../components/Ticket';
import { Typewriter } from 'react-simple-typewriter';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const LatestTicket = () => {
    const axiosSecure = useAxiosSecure()
    const {data: tickets = []} = useQuery({
        queryKey: ['tickets'],
        queryFn: async () =>{
            const result = await axiosSecure.get(`/tickets`)
            return result.data
        }
    })

    
    return (
        <div className='bg-base-200 py-10 mt-20 px-3 rounded-xl'>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-purple-500 mb-10 leading-tight">
                       Latest Tickets Section {" "}
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-15'>
            {
                tickets.map(ticket=><Ticket key={ticket._id} ticket={ticket}></Ticket>)
            }
        </div>
        </div>
               
            
       
    );
};

export default LatestTicket;