const Login = () => {
    return(
        <div> 
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"></input>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}
export default Login;
