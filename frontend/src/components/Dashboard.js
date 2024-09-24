import { useEffect, useState } from 'react';
import axios from 'axios';
import DashBoardSidebar from './DashBoardSidebar';


const Dashboard = () => {
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
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-3">
                    <DashBoardSidebar />
                </div>
                <div className='col-md-9'>
                    <div className='card'>
                        <div className="card-header bg-warning">
                            My Information
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Email: {user.email}</h5>
                            <h5 className="card-title">Mobile: {user.mobile_number}</h5>
                            <h5 className="card-title">Address: {user.address}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Dashboard