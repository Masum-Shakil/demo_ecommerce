import { useEffect, useState } from 'react';
import axios from 'axios';
import DashBoardSidebar from './DashBoardSidebar';
import { toast } from 'react-toastify';


const MyWishlist = () => {
    const [wishList, setWishList] = useState([]);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        const fetchWishListItems = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/wish_list_show/?user_id=${userID}`);
                setWishList(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWishListItems();
    }, [userID]);

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/ecommerce/wish_list_delete/${itemId}/`);
            toast.warning('Product is deleted from the wishlist!')
            setWishList(wishList.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Failed to delete item:', err);
        }
    };

    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-3">
                    <DashBoardSidebar />
                </div>
                <div className='col-md-9'>
                    <div className='card'>
                        <div className="card-header bg-warning">
                            My Wish List
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                <img src={item.product.image} className="card-img-top img-fluid" alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                            </td>
                                            <td>
                                                {item.product.name}
                                            </td>
                                            <td>
                                                {item.product.price} BDT
                                            </td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete <i className="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default MyWishlist