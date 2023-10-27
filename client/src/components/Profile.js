import "../App.css";
import Navbar from "./Navbar";
import profile_img from "../images/profile.jpg";

function Profile() {
  return (
    <div>
      <Navbar />
      {/* <div>
        <h1>Profile</h1>
      </div> */}
      {
        <div class="boxes-container">
          <div class="left-boxes">
            <div class="patient">
              <h1>Ron D</h1>
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

            <button class="blue">Edit Profile</button>
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

export default Profile;
