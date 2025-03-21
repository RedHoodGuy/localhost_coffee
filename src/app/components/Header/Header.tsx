
'use client'
import Link from 'next/link';

import SvgLhcVertLogoWht from '../../../../public/logos/White Logos/LHC vert logo (wht).svg';

const Header = () => {
    return (
        <>
        <header>
            <Link href='/'>
                <SvgLhcVertLogoWht width={350} height="auto" href='/'/>
            </Link>
        </header>
        </>
    )
}

export default Header;