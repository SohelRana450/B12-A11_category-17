import React from 'react';
import { Link } from 'react-router';

const Ticket = ({ticket}) => {
    return (
        <div className='card'>
            
                <img className='rounded-xl w-full h-65 transition transform duration-300  hover:scale-103' src={ticket.image} alt="" />
               <div className='mt-5'>
                 <h3 className='font-bold text-xl'>{ticket.Ticket_title}</h3>
               
                <p><span className='font-medium'>Ticket-quantity: </span>{ticket.Ticket_quantity}</p>
                <div className='flex gap-10'>
                    <p><span className='font-medium'>Transport: </span>{ticket.Transport}</p>
                 <p><span className='font-medium'>Price:</span> {ticket.Price}</p>
                </div>
                <p><span className='font-medium'>Perks: </span>{ticket.Perks}</p>
                <Link to={`/all-tickets/${ticket._id}`} className='py-2 px-10 btn btn-active bg-blue-500 border-0 mt-2'>See Details</Link>
               </div>
          
        </div>
    );
};

export default Ticket;