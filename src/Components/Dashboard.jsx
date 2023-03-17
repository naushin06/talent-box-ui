import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import CourseList from "./Courses";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["jwtToken"]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies["jwtToken"]) {
        console.log("Cookies:::", cookies);
        navigate("/dashboard");
      } else {
        navigate("/register");
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const removeAllCookies = () => {
    removeCookie('jwtToken', { path: '/talentbox' });
  };
  const logOut = () => {
    axios
      .get("http://localhost:4000/talentbox/logout")
      .then(function (response) {
        console.log(response.data);
        removeAllCookies();
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="main-page">
        <div className="wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                <h1 class="big-heading" data-test-label="landing-header">
                  Learn to code — for free.
                </h1>
                <div className="space"> </div>
                <div className="text-center quote-partial">
                  <blockquote class="blockquote">
                    <span>
                      <q>
                        The question of whether computers can think is like the
                        question of whether submarines can swim.
                      </q>
                      <footer class="quote-author blockquote-footer">
                        <cite>E.W. Dijkstra</cite>
                      </footer>
                    </span>
                  </blockquote>
                  <div className="map-ui">
                    <ul>
                      <li>
                        <Link>
                          <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                            <a
                              class="btn link-btn btn-lg"
                              href="/learn/data-visualization/"
                            >
                              <div className="sbutton">
                                Data Visualization Certification
                              </div>
                            </a>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={logOut}>Logout</button>

      <ToastContainer />
    </>
  );
}
