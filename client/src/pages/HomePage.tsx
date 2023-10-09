
import Logo from '../assets/logo.svg';
import Navbar from '../components/NavBar';
//#0e98da
//TODO: dinamically change title of page
const HomePage = () => {
    return (<div>
        <Navbar/>
        <img width={200} height={200} src={Logo} alt='logo'/> 
        </div>);
}

export default HomePage;