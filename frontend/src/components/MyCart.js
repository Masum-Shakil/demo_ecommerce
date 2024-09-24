import { useEffect, useState } from 'react';
import axios from 'axios';
import DashBoardSidebar from './DashBoardSidebar';
import { toast } from 'react-toastify';


const MyCart = () => {
    const [cart, setCart] = useState([]);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/cart_list_show/?user_id=${userID}`);
                setCart(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCartItems();
    }, [userID]);

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/ecommerce/cart_delete/${itemId}/`);
            toast.warning('Product is deleted from the cart!')
            setCart(cart.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Failed to delete item:', err);
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (let item of cart) {
            total += Number(item.product.price)
        }
        return total.toFixed(2);
    };

    const handlePayment = async () => {
        const totalPrice = calculateTotalPrice();
        const data = {
            user_id: userID,
            total_amount: totalPrice,
            tran_id: `tran_${Date.now()}`
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/initiate_payment/', data);
            if (response.data && response.data.redirectGatewayURL) {
                window.location.href = response.data.redirectGatewayURL;
            }
        } catch (err) {
            console.error('Payment initiation failed:', err);
            toast.error('Failed to initiate payment. Please try again.');
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
                            My Cart List
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
                                    {cart.map((item, index) => (
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
                            {cart.length > 0 && (
                                <>
                                    <div className="mt-3">
                                        <h5>
                                            Total Prices: {calculateTotalPrice()} BDT 
                                        </h5>                               
                                    </div>
                                    <div className="mt-3">
                                        <button className='float-end btn btn-warning' onClick={handlePayment}>Make Payment</button>                               
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default MyCart