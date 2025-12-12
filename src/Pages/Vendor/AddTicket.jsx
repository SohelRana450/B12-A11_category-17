import React from 'react';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router';

const AddTicket = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

    return (
        <div>
            <div className="card bg-base-100 w-full h-full mx-auto shadow-2xl">
      <div className="card-body ">
       <form onSubmit={handleSubmit(onSubmit)} action="">
         <div className="space-y-2 justify-center items-center ">
         <div className='flex justify-between items-center gap-20'>
             <div className=' space-y-2 w-full'>
            <label className="label  font-medium"> Ticket title</label>
          <input type="text"
           {...register("Ticket title")}
           className="input block w-full" 
           placeholder=" Ticket title" />
          </div>
         <div className='w-full'>
             <label className="label  mb-2 font-medium"> From(Location)</label>
          <input type="text"
          {...register("From")} 
          className="input w-full" 
          placeholder=" From(Location)" />
         </div>
         </div>

          <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                <label className="label block"> To(Location)</label>
          <input type="text"
          {...register("To")} 
          className="input w-full" 
          placeholder=" To(Location)" />
            </div>
            <div className='space-y-2 w-full'>
                <label className="label block">Transport type</label>
          <input type="text"
          {...register("Transport")} 
          className="input w-full" 
          placeholder=" Transport type" />
            </div>
          </div>
          
          <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                <label className="label block"> Price(per unit)</label>
          <input type="text"
          {...register(" Price")} 
          className="input w-full" 
          placeholder="Price(per unit)" />
            </div>
            <div className='space-y-2 w-full'>
                 <label className="label block">Ticket quantity</label>
          <input type="text"
          {...register("Ticket quantity")} 
          className="input w-full" 
          placeholder=" Ticket quantity" />
            </div>
          </div>
         
         <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                 <label className="label block">Departure date & time</label>
          <input type="text"
          {...register("Departure date & time")} 
          className="input w-full" 
          placeholder="Departure date & time" />
            </div>
            <div className='space-y-2 w-full'>
            <label className="label block"> Perks</label>
          <input type="text"
          {...register(" Perks")} 
          className="input w-full" 
          placeholder=" Perks" />
            </div>
         </div>
          
         <div className='flex justify-between gap-20 items-center'>
            <div className='space-y-2 w-full'>
                 <label className="label block">Image upload</label>
          <input type="file"
          {...register("Image")} 
          className="file-input-accent cursor-pointer bg-[#bde0fe] text-black font-medium px-6 w-full py-2 rounded-lg hover:bg-[#ffc8dd] " 
          placeholder="Image upload" />
            </div>
            <div className='space-y-2 w-full'>
                <label className="label block">Vendor name</label>
          <input type="text"
          {...register("Vendor name")} 
          className="input w-full" 
          placeholder=" Vendor name" />
            </div>
         </div>
          
          <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                <label className="label block">Vendor email</label>
          <input type="email"
          {...register("Vendor email")} 
          className="input w-full" 
          placeholder=" Vendor email" />
            </div>
            <div className='w-full pt-5 space-y-2  '>
                <button className="btn btn-neutral mt-4 w-50">Add Ticket</button>
                <Link to="/" className='btn btn-active ml-8 w-50  mt-2'><span className='pt-1'><BiArrowBack className=''/></span>Go To Home</Link>
            </div>
          </div>
          
          
        </div>
       </form>
      </div>
    </div>
        </div>
    );
};

export default AddTicket;