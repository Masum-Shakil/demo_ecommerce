import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../Main';
import { toast } from 'react-toastify';

const ProductDetails = () => { 
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchProductDetail = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/product/${id}/`);
            setProduct(response.data);
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false);
          }
        };
    
        fetchProductDetail();
      }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-3">
                    <img src={product.image} className="card-img-top img-fluid" alt={product.name} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text mt-2"><strong>Price: </strong>{product.price} BDT</p>
                        <p className="card-text mt-2">{product.description} BDT</p>
                        <div className='text-center d-flex justify-content-center'>
                            <button href="#" className="btn btn-warning me-2" onClick={handleAddToCart}>Add Cart <i className="bi bi-cart-plus-fill ms-2"></i></button>
                            <button onClick={handleAddToWishList} href="#" className="btn btn-warning">Add Wishlist <i className="bi bi-basket-fill ms-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>                  
        </div>  
    )
}

export default ProductDetails