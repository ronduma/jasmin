import "../App.css";
import profile_img from "../images/profile.jpg";
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';

function EditProfile() {
  return (
    <div>
      {/* <div>
        <h1>Profile</h1>
      </div> */}
      {
        <div class="boxes-container">
          <div class="left-boxes">
            <div class="patient">
              <h1>
                Ron D <i class="fa-regular fa-pen-to-square"></i>
              </h1>

              <img src={profile_img} alt="Your Image" class="round-image" />

              <div class="list-container">
                <ul class="list">
                  <li>Age</li>

                  <li>Gender</li>
                  <li>Languages</li>
                  <li>Location</li>
                  <li>Occupation</li>
                </ul>
                <ul class="list">
                  <li>21</li>
                  <li>Male</li>
                  <li>English, Viet, Spanish</li>
                  <li>New Jersey, USA</li>
                  <li>Student</li>
                </ul>
              </div>
            </div>

            <Button class = "blue" component = {NavLink} to='/profile' color="inherit">Save and Return</Button>
            
          </div>

          <div class="right-boxes">
            <div class="right-box">
              <h1>Bio</h1>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                felis tellus, malesuada vel cursus et, sodales sit amet eros.
                Integer sed justo ac dolor molestie.
              </p>
            </div>

            <div class="right-box">
              <h1>Core Concerns</h1>
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

            <div class="right-box">
              <h1>Frustrations</h1>
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
      }

    </div>
  );
}

export default EditProfile;
