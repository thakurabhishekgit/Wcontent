import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";

import NewCollab from "../components/NewCollab ";
import NewOpportunity from "../components/NewOpportunity ";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
import ApplicationOfCollab from "../components/ApplicationOfCollab";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <style>
        {`
    .account {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background: linear-gradient(135deg, #1a1a1a, #0a0a0a); /* Dark gradient */
      color: #fff; /* Light text */
    }
    .component_header {
      text-align: center;
      color: #fff; /* Light text */
      font-size: 2rem;
      font-weight: 700;
    }
    .container {
      background: linear-gradient(135deg, rgba(0, 8, 14, 0.5), rgb(9, 1, 1)); /* Dark gradient */
      display: flex;
      height: calc(100vh - 100px); /* Adjust based on your header/footer height */
      overflow: hidden;
    }
    .sidebar {
      width: 250px;
      padding: 20px;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      border-right: 1px solid #444; /* Dark border */
      flex-shrink: 0;
      background: linear-gradient(135deg, #2a2a2a, #1a1a1a); /* Dark gradient */
      color: #fff; /* Light text */
    }
    .sidebar_links {
      list-style-type: none;
      padding: 0;
    }
    .sidebar_links li {
      margin-bottom: 10px;
    }
    .sidebar_links h4 {
      margin-bottom: 15px;
      color: #007bff; /* Accent color for headings */
    }
    .sidebar_links button {
      background: none;
      border: none;
      color: #007bff; /* Accent color for buttons */
      cursor: pointer;
      padding: 10px;
      width: 100%;
      text-align: left;
      transition: background-color 0.3s, color 0.3s;
    }
    .sidebar_links button:hover {
      background-color: #333; /* Dark hover background */
      border-radius: 5px;
      color: #fff; /* Light text on hover */
    }
    .banner {
      flex-grow: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: #1a1a1a; /* Dark background */
      color: #fff; /* Light text */
    }
    .sidebar_icon {
      position: absolute;
      top: 20px;
      left: 260px;
      cursor: pointer;
      color: #fff; /* Light text */
    }
    .move_right {
      left: 0;
      transition: left 0.3s;
    }
    .move_left {
      left: 260px;
      transition: left 0.3s;
    }
    .right_arrow {
      transform: rotate(180deg);
    }
    .left_arrow {
      transform: rotate(0deg);
    }
    .showSidebar {
      display: block;
    }
  `}
      </style>
      <section className="account">
        <div className="component_header">
          <p>Dashboard</p>
          <p color="white">
            Welcome! <span>{localStorage.getItem("username")}</span>
          </p>
        </div>
        <div className="container">
          <div className={show ? "sidebar showSidebar" : "sidebar"}>
            <ul className="sidebar_links">
              <h4>Manage Account</h4>
              <li>
                <button
                  onClick={() => {
                    setComponentName("My Profile");
                    setShow(!show);
                  }}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Profile");
                    setShow(!show);
                  }}
                >
                  Update Profile
                </button>
              </li>

              {localStorage.getItem("token") && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("opp Post");
                      setShow(!show);
                    }}
                  >
                    Post New Oppurtunity
                  </button>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("add collab");
                      setShow(!show);
                    }}
                  >
                    Add collab
                  </button>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Applications");
                      setShow(!show);
                    }}
                  >
                    Applications of Oppurtunites
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Password");
                    setShow(!show);
                  }}
                >
                  collab request
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="banner">
            <div
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight
                onClick={() => setShow(!show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </div>
            {(() => {
              switch (componentName) {
                case "My Profile":
                  return <MyProfile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <ApplicationOfCollab />;
                case "opp Post":
                  return <NewOpportunity />;
                case "add collab":
                  return <NewCollab />;
                case "Applications":
                  return <Applications />;
                case "My Applications":
                  return <MyApplications />;
                default:
                  return <MyProfile />;
              }
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
