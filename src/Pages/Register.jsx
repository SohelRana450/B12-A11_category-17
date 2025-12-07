import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {register,handleSubmit, formState: {errors}} = useForm()
    const {createUser,googleLogin,setUser,updatedProfile} = useAuth();

    const onSubmit =(data)=>{
        const profileImg = data.image[0]
        createUser(data.email, data.password)
        .then(result =>{
            
            const formData = new FormData();
            formData.append("image", profileImg);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`


            axios.post(image_API_URL, formData)
            .then(result =>{
              console.log('image upload',result.data.data.url);
              setUser(result.data.data)

              const userProfile ={
                displayName: data.name,
                photoURL: result.data.data.url
              }
              updatedProfile(userProfile)
              .then(result=>{
                setUser(result)
                navigate('/')
              })
              .catch()
              
            })
            setUser(result.user)
        })

        .catch(error => {
            console.log(error);
        })
    }

    const handleSignIn = () =>{
        console.log('data');
        googleLogin()
        .then(result =>{
            console.log(result.user);
            setUser(result.user)
            navigate(location.state?.pathname || "/")
            toast.success('Successfully Register!');
        })
        .catch(error=> console.log(error.message)
        )
    }
    return (
        <div className="hero card h-screen  my-10 ">
 
    <div className="card-body bg-base-100 w-full max-w-lg rounded-xl p-10  shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h1 className="text-3xl font-bold">Register Your Account!</h1>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" {...register("name", {required: true})} className="input w-full" placeholder="Your Name" />
          <label className="label">Email</label>
          <input type="email" {...register("email", {required: true})} className="input w-full" placeholder="Email" />
          {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

 
  
  <div>
  <label className="block mb-2 font-medium">Pick a file</label>

  <label
    htmlFor='fileUpload'
    className="cursor-pointer bg-[#bde0fe] text-black font-medium px-10 py-2 rounded-lg hover:bg-[#ffc8dd]"
  >
    Choose File
  </label>

  <input
    id='fileUpload'
    type="file"
    className="hidden"
    {...register("image",{required: true
    })}
  />
  {errors.image?.type === 'required' && <p className='text-red-500 pt-2'>Image is required</p>}
</div>


          <label className="label">Password</label>
          <input type="password" {...register("password",{
            required: true,
            minLength: 6
          })} className="input w-full" placeholder="Password" />
          {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must have at least one uppercase, one lowercase, and be 6+ characters long.</p>}
    
          <button type='submit' className="btn btn-active bg-[#ffc8dd] text-black border-0 mt-4">Register</button>
          <p className='text-center font-semibold text-sm pt-5'>All Ready Have An Account ? Please <Link className='text-blue-500 underline ' to="/auth/login">Login</Link></p>
        </fieldset>
      
      </form>
        {/* Google */}
<button onClick={handleSignIn} className="btn bg-white  text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Sign Up with Google
</button>

    </div>
  </div>

    );
};

export default Register;