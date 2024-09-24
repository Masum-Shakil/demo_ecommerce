import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashBoardSidebar = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user_id = localStorage.getItem('userID');
            const response = await axios.get(`http://127.0.0.1:8000/api/accounts/user/${user_id}`);
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchUser();
    }, []);

    return (
        <div className="card">
            <h5 className="card-header bg-warning">Hi Mr. {user.username}!!</h5>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item">My Details</Link>
                    <Link to="/mycart" className="list-group-item">My Cart</Link>
                    <Link to="/mywishlist" className="list-group-item">My Wish List</Link>
                    <Link to="/myorder" className="list-group-item">Payment History</Link>
                </ul>
            </div>
        </div>
    )
}

export default DashBoardSidebar