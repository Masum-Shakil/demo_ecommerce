import { Link } from 'react-router-dom';
import { useAuth } from '../Main';
import { useNavigate } from 'react-router-dom';
import { useCartWishlist } from './CartWishlistContext';


const Header = () => {
    const { isLoggedIn, logout, setSearchQuery } = useAuth();
    const navigate  = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    
    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const { cartCount, wishlistCount } = useCartWishlist(); 

    return (
        <nav className="navbar navbar-expand-lg bg-warning">
            <div className="container">
                <Link className="navbar-brand" to="/">Demo Ecommerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <form className="d-flex me-5" role="search" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} />
                        </form>                        
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item ms-5">
                                    <Link type="button" className="nav-link btn btn-info" aria-current="page" to="/signup">Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link type="button" className="nav-link btn btn-info" to="/signin">Log In</Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/dashboard" type="button" className="nav-link btn btn-info">
                                        Dashboard
                                    </Link>
                                </li>
                                <Link to="/mycart" className="nav-item">
                                    <button type="button" className="nav-link btn btn-info">
                                        Cart <i className="bi bi-cart-plus-fill me-2"></i> 
                                        <span className="badge bg-danger">{cartCount}</span>
                                    </button>
                                </Link>
                                <Link to="/mywishlist" className="nav-item">
                                    <button type="button" className="nav-link btn btn-info">
                                        Wish List <i className="bi bi-basket-fill me-2"></i> 
                                        <span className="badge bg-danger">{wishlistCount}</span>
                                    </button>
                                </Link>
                                <li className="nav-item">
                                    <Link to="/" type="button" className="nav-link btn btn-info" onClick={handleLogout}>Log Out</Link>
                                </li>
                            </>
                        )}
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
  )
}

export default Header