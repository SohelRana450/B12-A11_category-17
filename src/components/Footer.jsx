import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div>
                <footer className=" footer sm:footer-horizontal justify-center lg:justify-between  p-10 font-medium">
          <aside className=''>      
    <Logo></Logo>
     <p className='w-90'>An easy-to-use ticket booking platform offering bus, train, and plane reservations with real-time schedules, seat selection, and secure checkout.</p>
                       
          </aside>
          
          <nav className=''>
            <h6 className="footer-title">Quick Links</h6>
            <Link to="/">Home</Link>
    <Link to="/all-tickets">All Tickets</Link>
    <Link to="/contact-us">Contact-Us</Link>
     <Link to="/about">About</Link>
          </nav>
          <nav className=''>
            <h6 className="footer-title"> Payment Methods</h6>
            <p>Stripe</p>
            <p>bKash</p>
            <p>Nagad</p>
          </nav>
          <nav className=''>
            <h6 className="footer-title">Contact Info</h6>
            <p>Email: xcc304050@gmail.com</p>
            <p>Phone: 01990347105</p>
            <p>Facebook Page: Md Shohel Rana</p>
          </nav>
        </footer>
        
           <div className=''>
             <p className='font-medium text-center py-8 mb-0'>Copyright © 2025 - Ticket.com All right reserved</p>
           </div>


  </div>       
    );
};

export default Footer;