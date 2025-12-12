import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthLaouts = () => {
    return (
        <div className='w-11/12 mx-auto '>
           <header>
            <Navbar></Navbar>
           </header>
           <main className=' mb-20'>
            <Outlet></Outlet>
           </main>
          <footer>
             <Footer></Footer>
          </footer>
        </div>
    );
};

export default AuthLaouts;