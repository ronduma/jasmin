import "./profile/styles.css";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import TherapistBioFromPatientView from "./profile/TherapistBioFromPatientView";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PatientBio from "./profile/PatientBio";
import PatientBioFromTherapistView from "./profile/PatientBioFromTherapistView";

function PatientView() {
  const { id } = useParams();
  const [profileData, setprofileData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [isMatched, setIsMatched] = useState(false);
  console.log("We are in Psychologist");
  const [therapist, setTherapist] = useState(null);

  const [loading, setLoading2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setprofileData(response.data);
        setLoading(false);
      } catch (e) {
        // console.log("yo")
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (profileData && currentUser) {
      // Check if currentUser.uid is included in profileData.patients
      if (profileData.therapist && profileData.therapist == currentUser.uid) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
    }
  }, [profileData, currentUser]);

  const handleClick = async () => {
    try {
      setLoading2(true);
      const response = await axios.post(`http://localhost:5173/matching`, {
        currentUserID: currentUser.uid,
        therapistID: id,
      });
      console.log("Success Match Response:", response.data);
      setIsMatched(!isMatched);
      setLoading2(false);
      if (isMatched) {
        Swal.fire({
          title: "Matched!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Unmatched!",
          icon: "success",
        });
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      setLoading2(false);
      if (error.response) {
        Swal.fire({
          title: "Error handling match!",
          icon: "error",
          text: error.response.data.message,
        });
      }
    }
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        alignItems={"stretch"}
      >
        <Grid item xs={12} md={6} lg={4}>
          {loading && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Add your loading icon component here */}
              loading...
            </div>
          )}

          <Paper className="left-section">
            <div className="left-section-header">
              {profileData.firstName} {profileData.lastName}
            </div>
            {profileData ? (
              <div>
                <div id="profilePic">
                  {profileData.profile_img ? (
                    <Avatar
                      alt="Profile Picture"
                      src={`data:image/png;base64,${profileData.profile_img}`}
                      sx={{ width: "10rem", height: "10rem", mx: "auto" }}
                    />
                  ) : (
                    <div sx={{ mx: "auto" }}>
                      <div>
                        <AccountCircleIcon
                          sx={{ width: "auto", height: "10rem" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <br />
                <div className="left-section-details">
                  <div style={{ display: "inline-block", textAlign: "left" }}>
                    <div>Age: {profileData.age}</div>
                    <div>Gender: {profileData.gender}</div>
                    <div>Location: {profileData.location}</div>
                    <div>Occupation: {profileData.occupation}</div>
                    <div>Email: {profileData.email}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>Missing Data</div>
            )}
            <br />
            {/* {isMatched ? (
              // <Button variant="contained" onClick={handleClick}>
              //   Unmatch with Patient
              // </Button>
            ) : (
              <Button variant="contained" onClick={handleClick}>
                Match
              </Button>
            )}{" "} */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <PatientBioFromTherapistView
            bio={profileData.bio}
            specialty={profileData.concerns}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PatientView;
