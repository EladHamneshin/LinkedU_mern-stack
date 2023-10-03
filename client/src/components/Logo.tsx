import logoSvg from '../assets/logo.svg';

const Logo = (props: any) => {
    return (
        <img  src={logoSvg} alt='logo' {...props} /> 
    );
}

export default Logo;