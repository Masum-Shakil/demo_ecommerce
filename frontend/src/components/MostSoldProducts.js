import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';

const MostSoldProducts = ({ product }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchMostSoldProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/products/most-sold/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching most sold products:', error);
            }
        };

        fetchMostSoldProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Most Sold Products</h3>
            <div className="row">
                {products.map((product) => (
                    <div className='col-md-3' key={product.id}>
                        <div className="card mb-4">
                            <Link to={`/product/${product.id}`}>
                                <img src={product.image} className="card-img-top img-fluid" alt={product.name} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/product/${product.id}`} className="card-title">{product.name}</Link>
                                <p className="card-text">{product.price} BDT</p>
                                <div className='text-center'>
                                    <button href="#" className="btn btn-warning">Total Sold: {product.sold}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}                
            </div>
        </div>
    )
}

export default MostSoldProducts