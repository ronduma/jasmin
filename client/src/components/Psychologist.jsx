import "../App.css";
import profile_img from "../images/profile.jpg";

function Psychologist() {
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
                </ul>
                <ul class="list">
                  <li>21</li>
                  <li>Male</li>
                  <li>English, Viet, Spanish</li>
                  <li>New Jersey, USA</li>
                </ul>
              </div>
            </div>

            <button class="blue">Edit Profile</button>
          </div>

          <div class="right-boxes">
            <div class="right-box">
              <h1>Reviews</h1>

              <ul class="list">
                <li>Rating</li>

                <li>Specialities</li>
              </ul>
              <ul class="list">
                <li>5.00 (21 Reviews)</li>
                <li>Anxiety, Stress Management, Relationships</li>
              </ul>
            </div>

            <div class="right-box">
              <h1>Upcoming Availability</h1>

              <table border="1">
                <tr>
                  <th colspan="7">November 2023</th>
                </tr>

                <tr>
                  <th>Su</th>
                  <th>Mo</th>
                  <th>Tu</th>
                  <th>We</th>
                  <th>Th</th>
                  <th>Fr</th>
                  <th>Sa</th>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                </tr>

                <tr>
                  <td>12</td>
                  <td>13</td>
                  <td>14</td>
                  <td>15</td>
                  <td>16</td>
                  <td>17</td>
                  <td>18</td>
                </tr>

                <tr>
                  <td>19</td>
                  <td>20</td>
                  <td>21</td>
                  <td>22</td>
                  <td>23</td>
                  <td>24</td>
                  <td>25</td>
                </tr>

                <tr>
                  <td>26</td>
                  <td>27</td>
                  <td>28</td>
                  <td>29</td>
                  <td>30</td>
                  <td></td>
                  <td></td>
                </tr>
              </table>

              <input
                type="checkbox"
                id="sessions_available"
                name="sessions_available"
                value="sessions_available"
              ></input>
              <label for="vehicle1"> Sessions Available</label>

              <input
                type="checkbox"
                id="unavailable"
                name="unavailable"
                value="unavailable"
              ></input>
              <label for="vehicle1"> Unavailable</label>
            </div>

            <div class="right-box">
              <h1>Bio</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                felis tellus, malesuada vel cursus et, sodales sit amet eros.
                Integer sed justo ac dolor molestie.
              </p>
            </div>

            <div class="right-box">
              <h1>Experience</h1>
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
              <h1>Hobbies</h1>
            </div>

            <div class="right-box">
              <h1>Qualifications</h1>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Psychologist;
