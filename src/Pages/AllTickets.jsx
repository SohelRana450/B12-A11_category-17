import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import SingleData from '../components/SingleData';

const AllTickets = () => {
    const {data: allData = [], isLoading} = useQuery({
        queryKey: ['all-tickets'],
        queryFn: async () =>{
            const result = await axios(`${import.meta.env.VITE_API_URL}/all-tickets`)
            return result.data
        }
    })
    console.log(allData);

    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {
                allData.map(single=><SingleData key={single._id} single={single}></SingleData>)
            }
        </div>
    );
};

export default AllTickets;