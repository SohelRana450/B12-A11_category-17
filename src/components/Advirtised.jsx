import React from 'react';
import { Link } from 'react-router';

const Advirtised = ({advirtise}) => {
    return (
        <div>
            <div className='card hover:shadow-2xl p-4 transition transform duration-300  hover:scale-103'>
            
                <img className='rounded-xl w-full h-45  ' src={advirtise.image} alt="" />
               <div className='mt-3'>
                 <h3 className='font-bold text-xl'>{advirtise.Ticket_title}</h3>
               
                <p><span className='font-medium'>Ticket-quantity: </span>{advirtise.Ticket_quantity}</p>
                <div className='flex gap-10'>
                    <p><span className='font-medium'>Transport: </span>{advirtise.Transport}</p>
                 <p><span className='font-medium'>Price:</span> {advirtise.Price}</p>
                </div>
                <p><span className='font-medium'>Perks: </span>{advirtise.Perks}</p>
                <Link to={`/all-tickets/${advirtise._id}`} className='py-2 px-10 btn btn-active bg-blue-500 border-0 mt-2'>See Details</Link>
               </div>
          
        </div>
        </div>
    );
};

export default Advirtised;