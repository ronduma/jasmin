import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "./styles.css";

import { useParams, Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function PatientBio({ bio, concerns }) {
  const { currentUser } = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [editConcerns, setEditConcerns] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [Appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currConcerns, setConcerns] = useState([
    concerns[0] || null,
    concerns[1] || null,
    concerns[2] || null,
  ]);

  const cancelAppointment = async (appointment) => {
    try {
      // Make a DELETE request to your server to cancel the appointment using appointmentId
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel Meeting",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);

          await axios.delete(
            `http://localhost:5173/meeting/${appointment.id}`,
            {
              data: {
                currentUserID: currentUser.uid,
                therapistID: appointment.therapist, // Assuming you have therapistID in your appointment object
                time: appointment.time, // Assuming you have time in your appointment object
              },
            }
          );

          let id = currentUser.uid;

          const responseMeeting = await axios.get(
            `http://localhost:5173/meeting/patient/${id}`
          );
          const fetchedAppointments = responseMeeting.data;
          setAppointments(fetchedAppointments); //all appointments

          Swal.fire({
            title: "Meeting Canceled!",
            icon: "success",
          });

          setLoading(false);
        }
      });

      // If the request is successful, update the appointments state to reflect the cancellation
      // setAppointments(prevAppointments =>
      //   prevAppointments.filter(appointment => appointment.id !== appointment.id)
      // );
    } catch (error) {
      console.error("Error canceling appointment:", error);
      Swal.fire({
        title: "Error canceling appointment",
        icon: "error"
      });

      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = currentUser.uid;

        const responseMeeting = await axios.get(
          `http://localhost:5173/meeting/patient/${id}`
        );
        const fetchedAppointments = responseMeeting.data;
        setAppointments(fetchedAppointments); //all appointments
      } catch (e) {
        console.log("yo");
        console.log(e);
      }
    };
    fetchData();
  }, [currentUser.uid]);

  const setConcernsHelper = (concerns) => {
    setConcerns([
      concerns[0] || null,
      concerns[1] || null,
      concerns[2] || null,
    ]);
  };
  const allowEditAbout = () => {
    setEditAbout(true);
  };
  const allowEditConcerns = () => {
    setEditConcerns(true);
  };

  const putBio = () => {
    axios
      .put("http://localhost:5173/profile/bio", {
        uid: currentUser.uid,
        bio: document.getElementById("textbox-bio").value,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditAbout(false);
  };

  const putConcerns = () => {
    console.log("concerns: ", currConcerns);
    axios
      .put("http://localhost:5173/profile/concerns", {
        uid: currentUser.uid,
        concerns: currConcerns,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditConcerns(false);
  };

  return (
    <Paper style={{ height: "100%" }}>
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
          Loading...
        </div>
      )}

      <Grid item xs={12}>
        <div className="about-me">
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="right-section-header">About Me</div>
            {editAbout ? (
              ""
            ) : (
              <IconButton onClick={allowEditAbout}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <TextField
            disabled={!editAbout}
            inputRef={(input) => input && input.focus()}
            fullWidth
            id="textbox-bio"
            label="Tell us about yourself!"
            value={currbio}
            onChange={(event) => setBio(event.target.value)}
            InputLabelProps={{
              shrink: currbio || editAbout ? true : false,
            }}
            multiline
            style={{ margin: "2vh 0 1vh 0" }}
            rows={3}
            inputProps={{
              maxLength: 285,
            }}
          />
          {editAbout && (
            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
              <IconButton>
                <CheckCircleIcon onClick={putBio}></CheckCircleIcon>
              </IconButton>
              <IconButton>
                <CancelRoundedIcon
                  onClick={() => {
                    setEditAbout(false);
                    setBio(bio);
                  }}
                ></CancelRoundedIcon>
              </IconButton>
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="core-concerns">
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="right-section-header">Core Concerns</div>
            {editConcerns ? (
              ""
            ) : (
              <IconButton onClick={allowEditConcerns}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <TextField
            disabled={!editConcerns}
            fullWidth
            id="textbox-concern-one"
            label="Concern #1"
            value={currConcerns[0] || ""}
            onChange={(event) =>
              setConcerns([
                event.target.value,
                currConcerns[1],
                currConcerns[2],
              ])
            }
            InputLabelProps={{
              shrink: currConcerns[0] || editConcerns ? true : false,
            }}
            style={{ margin: "2vh 0 2vh 0" }}
            inputProps={{
              maxLength: 90,
            }}
          />
          <TextField
            disabled={!editConcerns}
            fullWidth
            id="textbox-concern-two"
            label="Concern #2"
            value={currConcerns[1] || ""}
            onChange={(event) =>
              setConcerns([
                currConcerns[0],
                event.target.value,
                currConcerns[2],
              ])
            }
            InputLabelProps={{
              shrink: currConcerns[1] || editConcerns ? true : false,
            }}
            style={{ margin: "2vh 0 2vh 0" }}
            inputProps={{
              maxLength: 90,
            }}
          />
          <TextField
            disabled={!editConcerns}
            fullWidth
            id="textbox-concern-three"
            label="Concern #3"
            value={currConcerns[2] || ""}
            onChange={(event) =>
              setConcerns([
                currConcerns[0],
                currConcerns[1],
                event.target.value,
              ])
            }
            InputLabelProps={{
              shrink: currConcerns[2] || editConcerns ? true : false,
            }}
            style={{ margin: "2vh 0 2vh 0" }}
            inputProps={{
              maxLength: 90,
            }}
          />
          {editConcerns && (
            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
              <IconButton>
                <CheckCircleIcon onClick={putConcerns}></CheckCircleIcon>
              </IconButton>
              <IconButton>
                <CancelRoundedIcon
                  onClick={() => {
                    setEditConcerns(false);
                    setConcernsHelper(concerns);
                  }}
                ></CancelRoundedIcon>
              </IconButton>
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="core-concerns">
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="right-section-header">Upcoming Appointments</div>
            {/* Add edit button if needed */}
          </div>
          {Appointments === null || Appointments.length === 0 ? (
            <Typography> No upcoming appointments.</Typography>
          ) : (
            <div>
              {Appointments.map((appointment, index) => (
                <div key={index}>
                  <Typography variant="body1">
                    {appointment.time} with{" "}
                    <Link to={`/matching/${appointment.therapist}`}>
                      {appointment.therapistName}
                    </Link>
                    :{" "}
                    <a href={appointment.roomUrl} target="_blank">
                      Meeting Link   
                    </a>
                    <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => cancelAppointment(appointment)}
                          style={{ marginLeft:"5px", marginBottom: "5px" }}
                        >
                         Cancel Meeting
                    </Button>
                  </Typography>
                  {/* Add additional details about the appointment if needed */}
                </div>
              ))}
            </div>
          )}
        </div>
      </Grid>
    </Paper>
  );
}

export default PatientBio;
