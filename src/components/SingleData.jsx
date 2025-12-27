import React from 'react';
import { Link } from 'react-router';

const SingleData = ({single}) => {
    return (
        <div className='card hover:shadow-2xl p-4'>
            
                <img className='rounded-xl w-full h-65 transition transform duration-300  hover:scale-103 ' src={single.image} alt="" />
               <div className='mt-3'>
                 <h3 className='font-bold text-xl'>{single.Ticket_title}</h3>
               
                <p><span className='font-medium'>Ticket-quantity: </span>{single.Ticket_quantity}</p>
                <div className='flex gap-10'>
                    <p><span className='font-medium'>Transport: </span>{single.Transport}</p>
                 <p><span className='font-medium'>Price:</span> {single.Price}</p>
                </div>
                <p><span className='font-medium'>Perks: </span>{single.Perks}</p>
                <Link to={`/all-tickets/${single._id}`} className='py-2 px-10 btn btn-active bg-blue-500 border-0 mt-2'>See Details</Link>
               </div>
          
        </div>
    );
};

export default SingleData;