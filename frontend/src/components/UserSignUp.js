import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserSignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', mobile_number: '', address: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/accounts/register/', formData);
            toast.success('Registration successful! Please check your email for verification.')
        } catch (error) {
            toast.error('Registration failed!')
        }
    };
    
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <h5 className='card-header text-center bg-warning'>Sign Up Here!!</h5>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" name="username" id="username" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile_number" className="form-label">Phone</label>
                                    <input type="text" className="form-control" name="mobile_number" id="mobile_number" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" id="address" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSignUp