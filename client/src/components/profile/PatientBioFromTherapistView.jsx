import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";
import axios from "axios";
import { Typography } from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import Swal from "sweetalert2";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function PatientFromTherapistView({ bio, concerns }) {
  const { currentUser } = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [profileData, setProfileData] = useState(null);
  const [Appointments, setAppointments] = useState(null);
  const [newBio, setNewBio] = useState(bio);
  const [isMatched, setIsMatched] = useState(false);
  const [editConcerns, setEditConcerns] = useState(false);

  console.log("We are in PatientFromTherapist");
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  if ((bio = "")) setBio(null);
  let [selectedDate, setSelectedDate] = useState(dayjs());

  const [currConcerns, setConcerns] = useState([
    concerns && concerns[0] ? concerns[0] : null,
    concerns && concerns[1] ? concerns[1] : null,
    concerns && concerns[2] ? concerns[2] : null,
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
                currentUserID: appointment.patient,
                therapistID: appointment.therapist, // Assuming you have therapistID in your appointment object
                time: appointment.time, // Assuming you have time in your appointment object
              },
            }
          );

          let id = currentUser.uid;

          const responseMeeting = await axios.get(
            `http://localhost:5173/meeting/therapist/${id}`
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
        icon: "error",
      });

      setLoading(false);
    }
    
  };

  const allowEditAbout = () => {
    setEditAbout(true);
  };
  const allowEditConcerns = () => {
    setEditConcerns(true);
  };

  const setConcernsHelper = (concerns) => {
    setConcerns([
      concerns && concerns[0] ? concerns[0] : null,
      concerns && concerns[1] ? concerns[1] : null,
      concerns && concerns[2] ? concerns[2] : null,
    ]);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5173/profile/${id}`);
  //       setprofileData(response.data);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log("Can not retrieve")
  //       console.log(e)
  //     }
  //   };
  //   fetchData();
  // }, [id]);
  useEffect(() => {
    if (profileData && currentUser) {
      // Check if currentUser.uid is included in profileData.patients
      if (
        profileData.patients &&
        profileData.patients.includes(currentUser.uid)
      ) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
    }
  }, [profileData, currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setProfileData(response.data);
        console.log("Profiledata");
        console.log(response.data);
        console.log(id);

        const responseMeeting = await axios.get(
          `http://localhost:5173/meeting/patient/${id}`
        );
        const fetchedAppointments = responseMeeting.data;
        // Set appointments
        const filteredAppointments = fetchedAppointments.filter(
          (appointment) =>
            appointment.therapist === currentUser.uid &&
            appointment.patient === id
        );
        console.log("Appointments");
        console.log(fetchedAppointments);
        setAppointments(filteredAppointments);

        setLoading(false);
      } catch (e) {
        console.log("PatientFromTherapistView profile");
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  //   insert Matching Button
  const handleClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5173/matching`, {
        currentUserID: currentUser.uid,
        therapistID: id,
      });
      console.log("Success Match Response:", response.data);
      setIsMatched(!isMatched);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <Paper style={{ height: "100%" }}>
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
              <IconButton onClick={allowEditAbout}></IconButton>
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
        <Paper style={{ minHeight: "18vh", padding: "2vh" }}>
          <div className="right-section-header"> Upcoming Appointments </div>
          {Appointments === null || Appointments.length === 0 ? (
            <Typography> No upcoming appointments.</Typography>
          ) : (
            <div>
              {Appointments.map((appointment, index) => (
                <div key={index}>
                  {/* <Typography variant="body1">
                    {appointment.time} with {appointment.therapistName}
                  </Typography> */}

                  <Typography variant="body1">
                    {appointment.time}:{" "}
                    <a href={appointment.hostRoomUrl} target="_blank">
                      {" "}
                      Host Meeting Link
                    </a>{" "}

                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => cancelAppointment(appointment)}
                        style={{ marginLeft: "5px", marginBottom: "5px" }}
                      >
                        Cancel Meeting
                      </Button>
                      
                  </Typography>

                  {/* Add additional details about the appointment if needed */}
                </div>
              ))}
            </div>
          )}
        </Paper>
      </Grid>
    </Paper>
  );
}

export default PatientFromTherapistView;
