const Register = () => {
    return(
        <div>
            <div>
                <h1>Register</h1>
                <form>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email</label>
                        <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"></input>
                    </div>
                    <div class="mb-3">
                        <label for="usernameInput" class="form-label">Username</label>
                        <input type="username" class="form-control" id="usernameInput" aria-describedby="emailHelp"></input>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput"></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    );
}
export default Register;