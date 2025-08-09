'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SvgLhcVertLogoWht from '../../../../public/logos/White Logos/LHC vert logo (wht).svg';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false); // Controls if the header is sticky
    const [isVisible, setIsVisible] = useState(true); // Controls header visibility
    const [isReturning, setIsReturning] = useState(false); // Controls smooth return to natural position
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 204) {
                // User has scrolled past the header height
                if (currentScrollY < lastScrollY) {
                    // Scrolling up
                    setIsSticky(true); // Make header sticky
                    setIsVisible(true); // Show header
                    setIsReturning(false); // Ensure no snapping
                } else {
                    // Scrolling down
                    setIsVisible(false); // Hide header
                }
            } else if (currentScrollY === 0) {
                // User has scrolled all the way to the top
                setIsSticky(false); // Header is no longer sticky
                setIsVisible(true); // Ensure header is visible
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky]);

    return (
        <>
            <div
                className={`${classes.header} ${
                    isSticky ? classes.sticky : isReturning ? classes.returning : ''
                } ${!isVisible ? classes.hidden : ''}`}
            >
                <div className={classes['logo-container']}>
                    <Link href='/'>
                        <SvgLhcVertLogoWht className={classes.logo} width={150} height="auto" />
                    </Link>
                </div>
                <Navbar />
            </div>
            {/* Placeholder to maintain header height */}
            <div className={classes.placeholder} style={{ height: isSticky ? '204px' : '0' }}></div>
            <div className={classes.bar}></div>
        </>
    );
};

export default Header;