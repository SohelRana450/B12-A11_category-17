 
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { saveOrUpdateData } from '../Image/ImageHost';

const Login = () => {
    const {register,handleSubmit, formState: {errors}} = useForm() 
    const {signInUser,setUser,googleLogin} = useAuth()
    const navigate = useNavigate();
    const [show, setShow] = useState()
    
        const onSubmit = async(data)=>{

            try {
                const result =await  signInUser(data.email,data.password)

                const user = result.user
            await saveOrUpdateData({
            name: user?.displayName,
            email: user?.email,
             image: user?.photoURL,
                        });
                setUser(user)
                navigate("/")
                    toast.success('Successfully Log In!');

            } catch (error) {
                 toast.error(error.message);
            }
        }

         const handleSignIn = async() =>{

        try {

        const result = await googleLogin()

         const user = result.user

        await saveOrUpdateData({
            name: user?.displayName,
            email: user?.email,
             image: user?.photoURL,
         });
          navigate("/")
                    toast.success('Successfully Log In!');
                    
                } catch (error) {
                    toast.error(error.message)
                }
            }

    return (
        <div className="hero card h-screen  my-10">
    <div className=" card-body bg-base-300 w-full max-w-lg py-6 rounded-xl shadow-2xl">
<h1 className="text-5xl text-center font-bold">Login now!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="">

        <fieldset className="fieldset">
          <div>
            <label className="block my-2 font-medium">Email</label>
          <input type="email"
          className="input w-full" placeholder="Email"
          {...register("email",{required: true,pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}})} />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          </div>
          
         <div className='relative'>
             <label className="block mb-2 font-medium">Password</label>
          <input type={show?"text":"password"}
           className="input w-full" placeholder="Password" 
           {...register("password", 
            {required:true,minLength:6,pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})}/>
            <span onClick={()=>setShow(!show)} className='absolute right-5 top-9'>{show? <FaEye className='w-4 h-4'/>:<IoEyeOff className='w-4 h-4'/>}</span>
          {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must have at least one uppercase, one lowercase, and be 6+ characters long.</p>}
         </div>
          <div><button className="link link-hover block font-medium">Forgot password?</button></div>
          <button type="submit" className="btn btn-active font-medium border-0 bg-[#bde0fe] dark:text-black mt-4">Log In</button>
          <p className='font-medium text-sm text-center py-2'>Create Your An Account? Please <Link to="/auth/register" className='text-blue-500 underline text-md'>Register</Link></p>
        </fieldset>
      </form>
   <button onClick={handleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Sign In with Google
</button>
    </div>
    </div>
    );
};

export default Login;