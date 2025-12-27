

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { Link,  useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { ImageHost, saveOrUpdateData } from '../Image/ImageHost';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, googleLogin, setUser, updatedProfile } = useAuth();
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];

     
      const imageURL = await ImageHost(imageFile);

      
      const result = await createUser(data.email, data.password);
      const user = result.user;

      
      await updatedProfile({
        displayName: data.name,
        photoURL: imageURL,
      });

      
      await saveOrUpdateData({
        name: data.name,
        email: data.email,
        image: imageURL,
      });

     
      setUser({
        ...user,
        displayName: data.name,
        photoURL: imageURL,
      });

      toast.success("Registration Successful!");
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    }
  };

  

const handleSignIn = async () => {
  try {
    const result = await googleLogin();
    const user = result.user;

    await saveOrUpdateData({
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    });

    setUser(user);
    toast.success("Successfully logged in with Google!");
    navigate("/");

  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <div className="hero card h-screen my-10">
      <div className="card-body bg-base-300 w-full max-w-lg rounded-xl p-10 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mb-3">Register Your Account!</h1>

          {/* Name */}
          <label className="font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full my-1"
            placeholder="Your Name"
          />{errors.name?.type === 'required' && (
                <p className='text-red-500 text-xs mt-1'>
                  Name is required
                </p>
              )}

          {/* Email */}
          <div>
            <label className="block my-2 font-medium">Email</label>
          <input type="email"
          className="input w-full" placeholder="Email"
          {...register("email",{required: true,pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}})} />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          </div>

          {/* Image Upload */}
          <label className="font-medium mt-1 block">Profile Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input-accent bg-[#bde0fe] px-10 py-2 mt-1 rounded-lg"
          />
          {errors.image && <p className="text-red-500">Image is required</p>}

          {/* Password */}
          <label className="font-medium mt-1 block">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              {...register("password", {required:true,minLength:6,pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})}
              className="input w-full"
              placeholder="Password"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-5 top-3 cursor-pointer"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500">
              Password must be 6+ characters long.
            </p>
          )}

          <button
            type="submit"
            className="btn bg-[#ffc8dd] mt-4 w-full border-0"
          >
            Register
          </button>

          <p className="text-center text-sm pt-4 font-semibold">
            Already have an account?{" "}
            <Link className="text-blue-500 underline" to="/auth/login">
              Login
            </Link>
          </p>
        </form>

        {/* Google Button */}
        <button
          onClick={handleSignIn}
          className="btn bg-white mt-3 text-black border border-gray-300"
        ><svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
