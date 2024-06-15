import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const[user, getUser] = useState({
        username: '',
        password: ''
    });

    const{ username, password } = user;
    const onChange = (e) => getUser({...user, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();

        fetchData("/user/login", 
        {
            username,
            password
        }, 
        "POST")
        .then((data) => {
            if(!data.message) {
                console.log(data)
                navigate("/profile")
            }
        })
        .catch((error) => { 
            console.log(error)
        })
    }
    return(
        <div className="form"> 
            <form onSubmit={onSubmit}>
            <h1>Login</h1>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="username" 
                        className="form-control" 
                        id="username" 
                        name="username"
                        onChange={onChange} 
                        value={username}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        name="password"
                        onChange={onChange} 
                        value={password}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}
export default Login;
