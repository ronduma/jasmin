import React from 'react';
import "../App.css";
import profile_img from "../images/profile.jpg";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaEdit } from 'react-icons/fa'; // Importing edit icon from Font Awesome

function EditProfile() {
  // Sample data for attributes
  const attributes = [
    { name: "Ron D" },
    { name: "Age", value: "21" },
    { name: "Gender", value: "Male" },
    { name: "Languages", value: "English, Viet, Spanish" },
    { name: "Location", value: "New Jersey, USA" },
    { name: "Occupation", value: "Student" }
  ];

  return (
    <div>
      <div className="boxes-container">
        <div className="left-boxes">
          <div className="patient">
            <h1>
              {attributes[0].name}
              <FaEdit className="edit-icon" />
            </h1>

            <img src={profile_img} alt="Your Image" className="round-image" />

            <div className="list-container">
              <ul className="list">
                {/* Mapping through attributes to generate rows */}
                {attributes.slice(1).map((attribute, index) => (
                  <li key={index}>
                    <span>{attribute.name}: {attribute.value}</span>
                    {/* Add edit icon for each attribute */}
                    <FaEdit className="edit-icon" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button className="blue" component={NavLink} to='/profile' color="inherit">Save and Return</Button>
        </div>

        <div className="right-boxes">
          <div className="right-box">
            <h1>
              Bio
              <FaEdit className="edit-icon" />
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce felis tellus, malesuada vel cursus et, sodales sit amet eros. Integer sed justo ac dolor molestie.
            </p>
          </div>

          <div className="right-box">
            <h1>
              Core Concerns
              <FaEdit className="edit-icon" />
            </h1>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
            </ul>
          </div>

          <div className="right-box">
            <h1>
              Frustrations
              <FaEdit className="edit-icon" />
            </h1>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
