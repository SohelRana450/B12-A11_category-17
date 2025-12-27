
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { ImageHost } from "../Image/ImageHost";
import Pending from "./Pending";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const UpdateAddedTicket = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-tickets/${id}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (ticket) {
      reset({
        Ticket_title: ticket.Ticket_title,
        From: ticket.From,
        To: ticket.To,
        Transport: ticket.Transport,
        Price: ticket.Price,
        Ticket_quantity: ticket.Ticket_quantity,
        departureDateTime: ticket.departureDateTime,
        Perks: ticket.Perks,
        image: ticket.image,
        Vendor_data: {
        name: ticket.Vendor_data.name,
        email: ticket.Vendor_data.email,
        image: ticket.Vendor_data.photoURL,
        }
      });
    }
  }, [ticket, reset]);

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedData) => {
      return axiosSecure.put(
        `/update/${id}`,
        updatedData
      );
    },
    onSuccess: () => {
      toast.success("Ticket updated successfully!");
      navigate('/dashboard/vendor/my-tickets')
    },
    onError: () => {
      toast.error("Update failed");
    },
  });


  const onSubmit = async (data) => {
    let imageUrl = data.image;

   
    if (data.Image?.length > 0) {
      imageUrl = await ImageHost(data.Image[0]);
    }

    const updatedTicket = {
      Ticket_title: data.Ticket_title,
      From: data.From,
      To: data.To,
      Transport: data.Transport,
      Price: Number(data.Price),
      Ticket_quantity: Number(data.Ticket_quantity),
      departureDateTime: data.departureDateTime,
      Perks: data.Perks,
      image: imageUrl,
      Vendor_data: {
        name:user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      }
    };
    await mutateAsync(updatedTicket);
  };

  if (isLoading) return <Pending />;

  return (
    <div className="card bg-base-300 shadow-xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("Ticket_title")} className="input w-full" />

        <input {...register("From")} className="input w-full" />

        <input {...register("To")} className="input w-full" />

        <input {...register("Transport")} className="input w-full" />

        <input {...register("Price")} type="number" className="input w-full" />

        <input {...register("Ticket_quantity")} type="number" className="input w-full" />

        <input
          {...register("departureDateTime")}
          type="date"
          className="input w-full"
          defaultValue={ticket.Time}
        />

        <select {...register("Perks")} className="select w-full">
          <option value="AC">AC</option>
          <option value="Non AC">Non AC</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Business Class">Business Class</option>
        </select>

        <div>
          <p className="text-sm mb-1">Upload New Image (optional)</p>
          <input type="file" {...register("Image")} className="file-input w-full" />
        </div>

        <input
          {...register("image")}
          readOnly
          className="input w-full bg-gray-200"
        />

        <input
          defaultValue={user?.displayName}
          className="input w-full bg-gray-200"
        />

        <input
          defaultValue={user?.email}
          className="input w-full bg-gray-200"
        />

        <button className="btn btn-primary w-full">
          Update Ticket
        </button>

        <Link to="/" className="btn btn-outline w-full">
          <BiArrowBack /> Go Home
        </Link>

      </form>
    </div>
  );
};

export default UpdateAddedTicket;
