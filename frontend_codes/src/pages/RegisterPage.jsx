import React, { useState } from 'react';
import userApi from '../api/userApi'


export default function RegisterPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePic: '',
        bio: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const user = await userApi.createUser(formData);
            console.log("user :",user.data)
            console.log("User Register Successfully ");
        }catch(error){
            console.log("Error response:", error);
            setError(error.response?.data?.message)
        }
    }

    const handleChange =  (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <div className="col-md-3 offset-md-4">
            <h1>Register Page</h1>
            {error && <div className='alert alert-danger'> {error} </div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>

        </div>
    )
}