import { useEffect } from 'react'
import { Link, useParams  } from 'react-router-dom'
import axios from 'axios';

const Verified = () => {
    const { user_id } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/accounts/verify-email/${user_id}/`);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error verifying email:', error.response ? error.response.data : error.message);
      }
    };

    verifyEmail();
  }, [user_id]);

    return (
        <div className='container mt-4 text-center text-success'>
            <p>Congratulations!! You are now verified.</p>
            <Link to="/signin" className='btn btn-success'>Signin Here</Link>
        </div>
    )
}

export default Verified