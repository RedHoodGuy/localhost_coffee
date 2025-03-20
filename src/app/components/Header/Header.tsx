
import Image from 'next/image';
import SvgLhcVertLogoWht from '../../../../public/logos/White Logos/LHC vert logo (wht).svg';

const Header = () => {
    return (
        <>
        <header>
            <Image src={SvgLhcVertLogoWht} alt='' height={300} width={200} priority/>
        </header>
        </>
    )
}

export default Header;