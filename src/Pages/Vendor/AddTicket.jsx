import React from 'react';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router';
import { ImageHost } from '../../Image/ImageHost';
import useAuth from '../../Hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTicket = () => {
    const {user} = useAuth()

   const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset
    } = useMutation({
    mutationFn: async dataLoad => await axios.post(`${import.meta.env.VITE_API_URL}/add-ticket`,dataLoad),
    onSuccess: () => {
      toast.success('Ticket Added Successfully')
      mutationReset()
    },
    onError: ()=>{
      toast.error('Ticket Not Added')
      mutationReset()
    },
    retry: 3,
   })



    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const onSubmit = async(data) => {
    const {Ticket_title,From,To,Transport,Price,Ticket_quantity,Time,Perks,Image} = data;
    const imageFile = Image[0]

    try {
      const imageUrl = await ImageHost(imageFile)
      const createdAt = new Date().toISOString();
      const ticketData = {
        image: imageUrl,
        Ticket_title,
        From,
        To,
        Transport,
        Perks,
        Price: Number(Price),
        Ticket_quantity: Number(Ticket_quantity),
        Time,
        Vendor_data: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
        createdAt

      }
      await mutateAsync(ticketData);
      reset()
    }catch (error) {
      console.log(error);
    }


  }


  if(isPending){
    return <p>Loading...</p>
  }

  if(isError){
    return <p>{isError.message}</p>
  }
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
           {...register("Ticket_title")}
           className="input block w-full" 
           placeholder="ticket" />
           {errors.Ticket_title?.type === 'required' && <p>Add ticket title</p>}
          </div>
         <div className='w-full'>
             <label className="label  mb-2 font-medium"> From(Location)</label>
          <input type="text"
          {...register("From")} 
          className="input w-full" 
          placeholder=" From(Location)" />
          {errors.From?.type === 'required' && <p>Add from location</p>}
         </div>
         </div>

          <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                <label className="label block"> To(Location)</label>
          <input type="text"
          {...register("To")} 
          className="input w-full" 
          placeholder=" To(Location)" />
          {errors.To?.type === 'required' && <p>Add to location</p>}
            </div>
            <div className='space-y-2 w-full'>
                <label className="label block">Transport type</label>
          <input type="text"
          {...register("Transport")} 
          className="input w-full" 
          placeholder="Transport type" />
          {errors.Transport?.type === 'required' && <p>Add Transport</p>}
            </div>
          </div>
          
          <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                <label className="label block"> Price(per unit)</label>
          <input type="text"
          {...register("Price",{ 
            required: true,
            min: {value: 0}})} 
          className="input w-full" 
          placeholder="Price(per unit)" />
          {errors.Price?.type === 'required' && <p>Add Price</p>}
            </div>
            <div className='space-y-2 w-full'>
                 <label className="label block">Ticket quantity</label>
          <input type="text"
          {...register("Ticket_quantity")} 
          className="input w-full" 
          placeholder=" Ticket quantity" />
          {errors.Ticket_quantity?.type === 'required' && <p>Add ticket quantity</p>}
            </div>
          </div>
         
         <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                 <label className="label block">Departure date & time</label>
          <input type="text"
          {...register("Time")} 
          className="input w-full" 
          placeholder="Departure date & time" />
          {errors.Time?.type === 'required' && <p>Add Departure date & time</p>}
            </div>
            <div className='space-y-2 w-full'>
            <label className="label block">Perks</label>
          <select  type="text"
          {...register("Perks")} 
          className="select w-full"
          defaultValue="Pick a Perks" 
          placeholder="Perks" name="Perks" id="">
            <option  disabled={true}>Pick a Perks</option>
            <option>AC</option>
            <option>Non AC</option>
            <option>Breakfast</option>
            <option>Business Class</option>
          </select>
          {errors.Perks?.type === 'required' && <p>Add perks</p>}
            </div>
         </div>
          
         <div className='flex justify-between gap-20 items-center'>
            <div className='space-y-2 w-full'>
                 <label className="label block">Image upload</label>
          <input type="file"
          {...register("Image")} 
          className="file-input-accent cursor-pointer bg-[#bde0fe] text-black px-6 w-full py-2 rounded-lg hover:bg-[#ffc8dd] " 
          placeholder="Image upload" />
          {errors.Image?.type === 'required' && <p>Add image upload</p>}
            </div>
            <div className='space-y-2 w-full'>
                <label className="label block">Vendor name</label>
          <input type="text"
          {...register("Vendor_name")} 
          defaultValue={user?.displayName}
          readOnly
          className="input w-full" 
          placeholder=" Vendor name" />
          {errors.Vendor_name?.type === 'required' && <p>Add Vendor Name</p>}
            </div>
         </div>
          
          <div className='flex justify-between items-center gap-20'>
            <div className='space-y-2 w-full'>
                <label className="label block">Vendor email</label>
          <input type="email"
          {...register("Vendor_email")} 
          defaultValue={user?.email}
          readOnly
          className="input w-full" 
          placeholder=" Vendor email" />
          {errors.Vendor_email?.type === 'required' && <p>Add Vendor email</p>}

            </div>
            <div className='w-full pt-5 space-y-2  '>
                <button className="btn btn-neutral mt-4 ml-8 md:ml-0 w-50">Add Ticket</button>
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