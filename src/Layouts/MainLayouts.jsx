import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
       <div className=''>
         <div >
           <header>
            <Navbar></Navbar>
           </header>
           <main className='w-11/12 mx-auto '>
            <Outlet></Outlet>
           </main>
          <footer className='w-11/12 mx-auto '>
             <Footer></Footer>
          </footer>
        </div>
       </div>
    );
};

export default MainLayouts;