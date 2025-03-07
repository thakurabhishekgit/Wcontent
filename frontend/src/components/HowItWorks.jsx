import React from "react";
import { Link } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <>
      <style jsx>{`
        .how-it-works {
          background: linear-gradient(
            135deg,
            rgba(0, 8, 14, 0.5),
            rgb(9, 1, 1)
          );
          padding: 60px 20px;
          background-color: #1a1a1a; /* Dark background */
          color: #fff; /* Light text */
          text-align: center;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
        }

        .how-it-works h3 {
          font-size: 2.5rem; /* Larger title */
          font-weight: 700;
          margin-bottom: 40px;
          color: #fff; /* Light text */
        }

        .how-it-works .container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .how-it-works .card {
          background: #2a2a2a; /* Dark card background */
          border: 1px solid #444; /* Subtle border */
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Dark shadow */
          padding: 30px;
          max-width: 320px;
          flex: 1 1 300px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .how-it-works .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* Enhanced shadow on hover */
        }

        .how-it-works .icon {
          font-size: 3rem;
          color: #007bff; /* Accent color for icons */
          margin-bottom: 20px;
        }

        .how-it-works h4 {
          font-size: 1.5rem; /* Larger heading */
          font-weight: 600;
          margin-bottom: 15px;
          color: #007bff; /* Accent color for headings */
        }

        .how-it-works p {
          font-size: 1rem;
          color: #ccc; /* Light gray text */
        }

        .how-it-works .card-divider {
          width: 80%;
          height: 1px;
          background-color: #444; /* Subtle divider */
          border: none;
          margin: 10px auto;
        }

        .how-it-works .button {
          padding: 14px 24px;
          border: none;
          border-radius: 8px;
          background-color: #007bff; /* Accent color for buttons */
          color: #fff;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Button shadow */
        }

        .how-it-works .button:hover {
          background-color: #005bb5; /* Darker shade on hover */
        }

        .how-it-works .response {
          margin-top: 20px;
          width: 80%;
          border: 1px solid #444; /* Subtle border */
          border-radius: 12px;
          padding: 20px;
          background-color: #2a2a2a; /* Dark background */
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Dark shadow */
        }

        .how-it-works .response-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #fff; /* Light text */
        }

        .how-it-works .response-content {
          line-height: 1.8;
          font-size: 1rem;
          color: #ccc; /* Light gray text */
        }
      `}</style>
      <section className="how-it-works">
        <h3>How does it work?</h3>
        <div className="container">
          <Link to="/login" className="card">
            <div className="icon">
              <LuUserPlus />
            </div>
            <h4>Create an Account</h4>
            <p>
              Sign up for a free account as a Creatoror . Set up your profile in
              minutes to start posting ,collabs or applying for posting
              ,collabs.
            </p>
          </Link>
          <Link to="/jobs" className="card">
            <div className="icon">
              <VscTasklist />
            </div>
            <h4>Post or Browse Jobs</h4>
            <p>
              Creator can post detailed collab or Oppurtunity descriptions, and
              other creators can apply a comprehensive list of available
              positions. Utilize filters to find there path that match your
              skills and preferences.
            </p>
          </Link>
          <Link to="/predict" className="card">
            <div className="icon">
              <BiSolidLike />
            </div>
            <h4>Predict your Content</h4>
            <p>
              Creators can shortlist candidates and extend collab offers.
              requesters seekers can review offers and accept positions that
              align with their content goals.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
