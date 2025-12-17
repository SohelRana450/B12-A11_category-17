import React from 'react';

const Ticket = ({ticket}) => {
    return (
        <div className='card my-10'>
            
                <img className='rounded-xl w-full h-50' src={ticket.image} alt="" />
               <div className='mt-5'>
                 <h3 className='font-bold text-xl'>{ticket.Ticket_title}</h3>
               
                <p><span className='font-medium'>Ticket-quantity: </span>{ticket.Ticket_quantity}</p>
                <div className='flex gap-10'>
                    <p><span className='font-medium'>Transport: </span>{ticket.Transport}</p>
                 <p><span className='font-medium'>Price:</span> {ticket.Price}</p>
                </div>
                <p><span className='font-medium'>Perks: </span>{ticket.Perks}</p>
                <button className='py-2 px-10 btn btn-active bg-blue-500 border-0 mt-2'>See Details</button>
               </div>
          
        </div>
    );
};

export default Ticket;