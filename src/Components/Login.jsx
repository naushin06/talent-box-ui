import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  useEffect(() => {
    return () => {
      // Code to run when the component is unmounted
      toast("registration")
    };
  }, [])
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
  console.log(cookies)
    if (cookies.jwt) {
      navigate("/dashboard");
    }
    else{
      navigate("/login")
      
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {      
      const { data } = await axios.post(
        "http://localhost:4000/talentbox/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        console.log(data)
        if (data.errors) {
          
          const { email, password } = data.errors;
          if (email) toast("");
          else if (password) generateError(password);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (ex) {
      console.log(ex);

    }
    
  };
  return (
    <div className="container">

      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button className="register-btn" type="submit">Submit</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;