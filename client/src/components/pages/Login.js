const Login = () => {
    return(
        <div> 
            <h1>Login</h1>
            <form>
                <div class="mb-3">
                    <label for="usernameInput" class="form-label">Username</label>
                    <input type="username" class="form-control" id="usernameInput" aria-describedby="emailHelp"></input>
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passwordInput"></input>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    );
}
export default Login;
