
import { fetchData } from "../../main.js";
//DONT NEED import { useState } from "react"; //Track state in a function component - takes initial state 
//as argument & returns an array containing current state value & function that updates the state
import { useNavigate } from "react-router-dom"; //Takes user to another page once logged in
import { useContext } from "react";
import UserContext from "../../Context/userContext.js";


const Register = () => {
    const navigate = useNavigate();

    const{ user, updateUser } = useContext(UserContext) //destructure user and updateUser from context

    const { email, username, password, confirmPassword } = user;
    
    const onChange = (e) => updateUser(e.target.name, e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Passwords must match") //Throw an error 
            return;
        } else {
            console.log("success!")
        }

        fetchData("/user/register",
            {
                email,
                username,
                password
            },
            "POST")
            
            .then((data) => {
                if (!data.message) { //If there is no error message 
                    console.log(data)
                    updateUser("authenticated", true)
                    navigate("/Profile")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="form">
            <form onSubmit={onSubmit}>
            <h1>Register</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={onChange} //when theres a change in the input we want to trigger onChange function
                        value={email}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name='username'
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
                        name='password'
                        onChange={onChange}
                        value={password}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="Password"
                        className="form-control"
                        id="confirmPassword"
                        name='confirmPassword'
                        onChange={onChange}
                        value={confirmPassword}
                        required
                    />
                </div>
                <input type="submit" className="btn" value="Register"/>
            </form>
        </div>
    );
}

export default Register;