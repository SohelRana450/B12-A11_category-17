import React from 'react';
import Banner from '../components/Banner';
import LatestTicket from './LatestTicket';
import ChooseUs from '../components/ChooseUs';
import PopularRoutes from '../components/PopularRoutes';
import AdvirtisedSection from '../components/AdvirtisedSection';
import useAuth from '../Hooks/useAuth';
import Pending from '../components/Pending';

const Home = () => {
    const {loading} = useAuth()

    if(loading){
        return <Pending/>
    }
    return (
        <div className=''>
            <div className='md:py-10 pt-10'>
                <Banner></Banner>
            </div>
            <div>
                <AdvirtisedSection/>
            </div>
           <div className='md:my-30'>
             <LatestTicket/>
           </div>
           <div className='mt-5'>
            <PopularRoutes/>
           </div>
           <div className='my-30'>
            <ChooseUs/>
           </div>
        </div>
    );
};

export default Home;