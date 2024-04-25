import React, { useContext, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

import { AuthContext } from "../../context/AuthContext";

import "../../App.css";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useParams, Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelOutlined";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Expertise from "./Expertise";

function TherapistBioFromPatientView({
  bio,
  specialty,
  overallRating,
  reviews,
}) {
  const { currentUser } = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [editReview, setEditReview] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [profileData, setProfileData] = useState(null);
  const [signedData, setSignedData] = useState(null);
  const [Appointments, setAppointments] = useState(null);
  const [newBio, setNewBio] = useState(bio);

  const [availableTimes, setAvailableTimes] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState(0);

  const [currReviews, setReviews] = useState(reviews);
  const [inputRating, setInputRating] = useState(0);
  const reviewInput = useRef(null);
  const reviewTitleInput = useRef(null);
  const [currRating, setRating] = useState(overallRating);

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
        try {
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

            let id = appointment.therapist;

            const responseMeeting = await axios.get(
              `http://localhost:5173/meeting/therapist/${id}`
            );
            const fetchedAppointments = responseMeeting.data;
            // filter appointments
            const filteredAppointments = fetchedAppointments.filter(appointment =>
              appointment.patient === currentUser.uid && appointment.therapist === id
            );
            setAppointments(filteredAppointments);

            console.log(Appointments);
            Swal.fire({
              title: "Meeting Canceled!",
              icon: "success",
            });

            setLoading(false);
          }
        } catch (error) {
          console.error("Error canceling appointment:", error);
          setLoading(false);
          Swal.fire({
            title: "Error canceling meeting",
            icon: "error",
          });
        }
      });

      // If the request is successful, update the appointments state to reflect the cancellation
      // setAppointments(prevAppointments =>
      //   prevAppointments.filter(appointment => appointment.id !== appointment.id)
      // );
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setLoading(false);
      Swal.fire({
        title: "Error canceling meeting",
        icon: "error",
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Grid item hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Grid>
    );
  }

  const handleSelectedTopics = (data) => {
    setSelectedTopics(data);
  };

  const { id } = useParams();
  if ((bio = "")) setBio(null);
  const [selectedTopics, setSelectedTopics] = useState(specialty);
  let [selectedDate, setSelectedDate] = useState(dayjs());

  const format = (date, index) => {
    let updatedtime;
    let time = index + 9;
    let afternoon = false;
    if (time > 12) {
      time -= 12;
      afternoon = true;
    }
    updatedtime = time.toString();
    return dayjs(date).format("MM/DD/YYYY") + " " + index;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("using effect");
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setProfileData(response.data);
        const signedUser = await axios.get(
          `http://localhost:5173/profile/${currentUser.uid}`
        );

        const responseMeeting = await axios.get(
          `http://localhost:5173/meeting/therapist/${id}`
        );
        const fetchedAppointments = responseMeeting.data;
        // filter appointments
        const filteredAppointments = fetchedAppointments.filter(
          (appointment) =>
            appointment.patient === currentUser.uid &&
            appointment.therapist === id
        );
        setAppointments(filteredAppointments);
        console.log(fetchedAppointments);


        setSignedData(signedUser.data);
        setEditReview(signedData.isTherapist);

        
        // set Calender
        console.log("bookedTimes");
        const bookedTimes = fetchedAppointments.reduce((acc, appointment) => {
          const date = dayjs(appointment.time).format("MM/DD/YYYY");
          const time = dayjs(appointment.time).format("h:mm A");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(time);
          return acc;
        }, {});
        setAvailableTimes(bookedTimes);
        console.log("avaialbletimes:");
        console.log(availableTimes);
      } catch (e) {
        console.log("yo");
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  //   insert Matching Button

  const handleTimeSelection = async (index) => {
    try {
      let updatedtime = format(selectedDate.$d, index);
      setLoading(true);

      const response = await axios.post(`http://localhost:5173/meeting`, {
        currentUserID: currentUser.uid,
        therapistID: id,
        time: updatedtime,
      });

      console.log("Success Match Response:", response.data);

      const responseMeeting = await axios.get(
        `http://localhost:5173/meeting/therapist/${id}`
      );

      const fetchedAppointments = responseMeeting.data;
      console.log(fetchedAppointments);
      const filteredAppointments = fetchedAppointments.filter(
        (appointment) =>
          appointment.patient === currentUser.uid &&
          appointment.therapist === id
      );
      setAppointments(filteredAppointments);

      const updatedAvailableTimes = { ...availableTimes };

      const selectedDateFormatted = updatedtime.$d;
      // Filter out the selectedTime from the availableTimes for the selectedDate
      console.log("updated");

      const bookedTimes = fetchedAppointments.reduce((acc, appointment) => {
        const date = dayjs(appointment.time).format("MM/DD/YYYY");
        const time = dayjs(appointment.time).format("h:mm A");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(time);
        return acc;
      }, {});
      setAvailableTimes(bookedTimes);
      Swal.fire({
        title: "Booking confirmed!",
        icon: "success",
      });
      setLoading(false);

      // setAvailableTimes(updatedAvailableTimes);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      setLoading(false);
      Swal.fire({
        title: "Time Selection Unsuccessful",
        icon: "error",
      });
    }
  };

  const handleInput = async (InputRating, ReviewTitle, Review) => {
    try {
      const response = await axios.post(`http://localhost:5173/reviews/${id}`, {
        reviewId: signedData._id,
        reviewTitle: ReviewTitle,
        reviewerName: signedData.firstName + " " + signedData.lastName,
        review: Review,
        rating: InputRating,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        {isLoading && (
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

        <Grid item xs={12}>
          <Paper style={{ minHeight: "18vh", height: "100%" }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Details" />
              <Tab label="Availability" />
              <Tab label="Reviews" />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="right-section-header">Expertise</div>
              </div>
              <Expertise
                disabled={!editAbout}
                selected={handleSelectedTopics}
                display={specialty}
              />
              <div className="right-section-header">About Me</div>
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton>
                    <CheckCircleIcon
                      onClick={() => {
                        putBio();
                        handleCheckboxChange();
                      }}
                    ></CheckCircleIcon>
                  </IconButton>
                  <IconButton>
                    <CancelRoundedIcon
                      onClick={() => {
                        setEditAbout(false);
                        setBio(newBio);
                      }}
                    ></CancelRoundedIcon>
                  </IconButton>
                </div>
              )}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <div className="right-section-header">Upcoming Availability</div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      minDate={dayjs().startOf("month")}
                      maxDate={dayjs().add(1, "month").endOf("month")}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <strong>Available Times:</strong>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      ></div>
                      {[...Array(9).keys()].map((index) => {
                        const time = dayjs(selectedDate)
                          .startOf("day")
                          .add(9, "hours")
                          .add(index, "hours")
                          .format("h:mm A");
                        if (
                          !availableTimes[selectedDate.format("MM/DD/YYYY")] ||
                          !availableTimes[
                            selectedDate.format("MM/DD/YYYY")
                          ].includes(time)
                        ) {
                          return (
                            <button
                              className="timeCalender"
                              key={index}
                              onClick={() => handleTimeSelection(time)}
                            >
                              {time}
                            </button>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </Grid>
              </Grid>

              <div className="right-section-header">
                {" "}
                Upcoming Appointments{" "}
              </div>
              {Appointments === null || Appointments.length === 0 ? (
                <Typography> No upcoming appointments.</Typography>
              ) : (
                <div>
                  {Appointments.map((appointment, index) => (
                    <div key={index}>
                      <Typography variant="body1">
                        {appointment.time}:{" "}
                        <a href={appointment.roomUrl} target="_blank">
                          Meeting Link
                        </a>{" "}
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => cancelAppointment(appointment)}
                          style={{ marginBottom: "5px" }}
                        >
                          Cancel Meeting
                        </Button>
                      </Typography>
                      {/* Add additional details about the appointment if needed */}
                    </div>
                  ))}
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="right-section-header"> Reviews </div>
              <div>
                <Typography component="legend" style={{ marginBottom: "20px" }}>
                  Overall Therapist Rating
                </Typography>
                <Rating
                  name="text-feedback"
                  value={currRating}
                  readOnly
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <Box>{currRating ? currRating.toFixed(2) : 0} Stars</Box>
              </div>

              <div style={{ marginTop: "50px" }}>
                <Typography component="legend">List of Reviews</Typography>
                {!currReviews ? (
                  <div style={{ marginTop: "50px" }}>Currently No Reviews</div>
                ) : (
                  <Stack direction="column" spacing={2}>
                    {/* {currReviews &&
                      currReviews.slice(-5).map((item, index) => (
                        <Card variant="outlined" key={index}>
                          <Typography>Name: {item[0].reviewerName}</Typography>
                          <Typography>Title: {item[0].reviewTitle}</Typography>
                          <Typography>Rating: {item[0].rating}</Typography>
                          <Typography>Date: {item[0].reviewDate}</Typography>
                          <Typography>Review: {item[0].review}</Typography>
                        </Card>
                      ))} */}
                  </Stack>
                )}
              </div>
              {!editReview ? (
                <div>
                  <div style={{ marginTop: "50px" }}>
                    <div
                      className="right-section-header"
                      style={{ marginBottom: "20px" }}
                    >
                      {" "}
                      Create Your Review{" "}
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography component="legend">Review Rating</Typography>
                      <Rating
                        name="text-feedback"
                        label="Review Rating"
                        value={inputRating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setInputRating(newValue);
                        }}
                      />
                    </div>
                    <TextField
                      inputRef={reviewTitleInput}
                      label="Name of Review"
                      id="textbox-Name"
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                    <TextField
                      inputRef={reviewInput}
                      fullWidth
                      label="Title of Review"
                      id="textbox-Review"
                      // value={currReview}
                      // onChange={event => setCurrReview(event.target.value)}
                      multiline
                      style={{ margin: "2vh 0 1vh 0" }}
                      rows={3}
                      inputProps={{
                        maxLength: 285,
                      }}
                    />
                  </div>

                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button
                      variant="contained"
                      onClick={(event) => {
                        event.preventDefault;
                        handleInput(
                          inputRating,
                          reviewTitleInput.current.value,
                          reviewInput.current.value
                        );
                      }}
                    >
                      Submit A Review
                    </Button>
                  </div>
                </div>
              ) : (
                <br />
              )}
            </CustomTabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBioFromPatientView;
