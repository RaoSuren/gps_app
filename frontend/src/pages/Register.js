import react, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [input, setInput] = useState({
        username:"",
        password:"",
    })

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = e => {
        setInput(prev =>
            ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", input)
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
        
    }
    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div >
    );
}

export default Register;
