import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        // `${apiBaseURL}/register`,
        "http://localhost:4000/talentbox/register",
        {
          ...values,
        },
        {
          withCredentials: true,
          mode: 'cors'
        },
      );
      if (data) {
        console.log(data);
        if (data.errors) {
          const { name, email, password } = data.errors;
          if (name) {
            generateError(name);
          } else if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          }
        } else {
          navigate("/login");
        }
      }
    } catch (err) {
      console.log(err);
    }

    console.log(values);
  };

  return (
    <>
      <div className="container">
        <h2>Register Account</h2>
        <form
          onSubmit={(e) => {
            HandleSubmit(e);
          }}
        >
          <div>
            {/* <label htmlFor="name">Name</label> */}
            <input
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            ></input>
          </div>

          <div>
            {/* <label htmlFor="email">Name</label> */}
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            ></input>
          </div>

          <div>
            {/* <label htmlFor="name">Name</label> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            ></input>
          </div>
          <button type="submit" className="register-btn">
            {" "}
            Submit
          </button>
          <span>
            Already have an account <Link to="/login"> login </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
