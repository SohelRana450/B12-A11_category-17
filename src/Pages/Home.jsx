import React from 'react';
import Banner from '../components/Banner';
import LatestTicket from './LatestTicket';
import PopularRoutes from '../components/PopularRoutes';

const Home = () => {
    return (
        <div className=' pt-10 '>
            <div className='py-10'>
                <Banner></Banner>
            </div>
           <div className='my-30'>
             <LatestTicket/>
           </div>
           <div>
            <PopularRoutes/>
           </div>
           
        </div>
    );
};

export default Home;