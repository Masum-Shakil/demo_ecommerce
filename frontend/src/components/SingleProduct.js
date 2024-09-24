import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { useAuth } from '../Main';
import axios from 'axios';

const SingleProduct = ({ product }) => {
    const { isLoggedIn } = useAuth()

    const handleAddToCart = async () =>{
        if (!isLoggedIn) {
            toast.error('Please Login First!')
        }

        else {

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/cart/', {
                    product_id: product.id,
                    user_id: localStorage.getItem('userID')
                });
                toast.success(response.data.message);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Failed to add product to cart.');
                }
            }
        }
    }
    
    const handleAddToWishList = async () =>{
        if (!isLoggedIn) {
            toast.error('Please Login First!')
        }

        else {

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/wishlist/', {
                    product_id: product.id,
                    user_id: localStorage.getItem('userID')
                });
                toast.success(response.data.message);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Failed to add product to cart.');
                }
            }
        }
    }

    return (
        <div className='col-md-3'>
            <div className="card mb-4">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} className="card-img-top img-fluid" alt={product.name} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                </Link>
                <div className="card-body">
                    <Link to={`/product/${product.id}`} className="card-title">{product.name}</Link>
                    <p className="card-text">{product.price} BDT</p>
                    <div className='text-center'>
                        <button className="btn btn-warning" onClick={handleAddToCart}>Add Cart <i className="bi bi-cart-plus-fill ms-2"></i></button>
                        <button onClick={handleAddToWishList} href="#" className="btn btn-warning mt-2">Add Wishlist <i className="bi bi-basket-fill ms-2"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct