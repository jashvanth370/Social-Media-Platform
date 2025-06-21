import { useState } from "react";
import userApi from "../api/userApi";

function Login() {

    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const user = await userApi.loginUser(formData);
            localStorage.setItem('token',user.token);
            console.log("User Login Successfully ");
        }catch(error){
            console.log("Error response:", error);
            setError(error.response?.data?.message)
        }
    }

    const handleChange = async(e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    return (
        <div className="col-md-3 offset-md-4">
            <h1>Login Page</h1>
            {error && <div className="alert alert-danger">{error} </div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            
        </div>
    )
}

export default Login;