'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SvgLhcVertLogoWht from '../../../../public/logos/White Logos/LHC vert logo (wht).svg';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';

const Header = () => {
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [hasScrolledPastHeader, setHasScrolledPastHeader] = useState(false);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if the user has scrolled past the header height (e.g., 100px)
            if (currentScrollY > 204) {
                setHasScrolledPastHeader(true);
            } else {
                setHasScrolledPastHeader(false);
            }

            // Determine scroll direction
            if (currentScrollY < lastScrollY) {
                setIsScrollingUp(true); // Scrolling up
            } else {
                setIsScrollingUp(false); // Scrolling down
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className={`${classes.header} ${
                    hasScrolledPastHeader && !isScrollingUp ? classes.hidden : ''
                }`}
            >
                <Link href='/'>
                    <SvgLhcVertLogoWht className={classes.logo} fill="#FFFFFF" stroke="#FFFFFF" width={150} height="auto" />
                </Link>
                <Navbar />
            </div>
            {/* Placeholder to maintain header height */}
            <div className={classes.headerPlaceholder}></div>
            <div className={classes.bar}></div>
        </>
    );
};

export default Header;