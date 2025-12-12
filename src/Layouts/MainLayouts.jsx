import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
       <div className=''>
         <div className='w-11/12 mx-auto '>
           <header>
            <Navbar></Navbar>
           </header>
           <main>
            <Outlet></Outlet>
           </main>
          <footer >
             <Footer></Footer>
          </footer>
        </div>
       </div>
    );
};

export default MainLayouts;