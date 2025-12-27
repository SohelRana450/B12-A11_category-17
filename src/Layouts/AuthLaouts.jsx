import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthLaouts = () => {
    return (
        <div className=''>
           <header>
            <Navbar></Navbar>
           </header>
           <main className='w-11/12 mx-auto  mb-20'>
            <Outlet></Outlet>
           </main>
          <footer className='w-11/12 mx-auto '>
             <Footer></Footer>
          </footer>
        </div>
    );
};

export default AuthLaouts;