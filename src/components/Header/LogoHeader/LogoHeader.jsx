import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.webp';
import logo1x from '../../../assets/images/logo/logo-1x.webp';
import logo2x from '../../../assets/images/logo/logo-2x.webp';
import './LogoHeader.css';

const LogoHeader = () => {
  return (
    <Link to="/dashboard" className="logo-header-link">
      <picture>
        <source srcSet={`${logo} 1x, ${logo1x} 2x, ${logo2x} 3x`} />
        <img src={logo} alt="Logo" />
      </picture>
    </Link>
  );
};

export default LogoHeader;
