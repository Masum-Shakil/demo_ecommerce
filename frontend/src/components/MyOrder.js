import { useEffect, useState } from 'react';
import axios from 'axios';
import DashBoardSidebar from './DashBoardSidebar';
import { toast } from 'react-toastify';


const MyOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const downloadInvoice = async (orderId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/orders/${orderId}/invoice/`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading invoice:', error);
            toast.error('Failed to download invoice');
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
                            My Order List
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Transaction ID</th>
                                        <th>Products</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                {item.tran_id}
                                            </td>
                                            <td>
                                                {item.order_items.length > 0
                                                    ? item.order_items.map(item => item.product.name).join(', ')
                                                    : 'No products'
                                                }
                                            </td>
                                            <td>
                                                {item.total_amount} BDT
                                            </td>
                                            <td>
                                                <span className="badge bg-warning text-dark">{item.status}</span>
                                            </td>
                                            <td>
                                                <button className='badge bg-warning text-dark' onClick={() => downloadInvoice(item.id)}>Invoice</button>
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

export default MyOrder