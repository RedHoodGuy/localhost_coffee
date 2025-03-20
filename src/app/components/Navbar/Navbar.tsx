import Link from 'next/link';

import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <>
        <div className={classes['inline-nav']}>
            <Link className={classes['navbar-link']} href='/'> Home</Link>
            <Link className={classes['navbar-link']} href='/Shop'> Shop</Link>
            <Link className={classes['navbar-link']} href='/Menu'> Menu</Link>
            <Link className={classes['navbar-link']} href='/About'> About Us</Link>
        </div>
        </>
    )
}

export default Navbar;