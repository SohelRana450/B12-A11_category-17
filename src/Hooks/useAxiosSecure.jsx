import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut,loading } = useAuth();
  
  const navigate = useNavigate()

  useEffect(() => { 
if(!loading && user?.accessToken){
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        
        return config;
      });

      const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
        return response
      },(error)=>{
        const statusCode = error.status;
        if(statusCode === 401 || statusCode === 403){
          logOut()
          .then(()=>{
            navigate('/auth/login')
          })
          .catch(err=>{
            toast.error(err.message)
          })
        }
        return Promise.reject(error)
      })

      return ()=>{
        axiosSecure.interceptors.request.eject(reqInterceptor);
        axiosSecure.interceptors.response.eject(resInterceptor);
      }
    }
  }, [user,loading,logOut,navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
