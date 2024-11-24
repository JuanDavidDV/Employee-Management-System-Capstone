import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(null);

  return (
    <section className="d-flex flex-column vh-100 bg-body-secondary justify-content-center align-items-center">
      <h1 className="text-center p-2">Welcome</h1>
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-100">
        <div 
          className="p-3 rounded border border-primary bg-primary-subtle"
          style={{ maxWidth: "25rem", width: "90%", height: "20rem" }}>
          <h2 className="pb-3">Login Page</h2>
          <form>
            <div className="pb-3">
              <label htmlFor="email"><b>Please enter your email:</b></label>
              <input 
                className="form-control rounded" 
                type="email" 
                id="email" 
                name="email" 
                placeholder="name@email.com" 
              />
            </div>
            <div className="pb-3">
              <label htmlFor="password"><b>Please enter your password:</b></label>
              <input 
                className="form-control rounded" 
                type="password" 
                id="password" 
                name="password" 
                placeholder="password" 
              />
            </div>
            <button className="btn btn-primary w-100 rounded">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

