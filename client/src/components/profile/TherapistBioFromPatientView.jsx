import React, { useContext, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

import { AuthContext } from "../../context/AuthContext";

import "../../App.css";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

import axios from "axios";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
  const [editReview, setEditReview] = useState(true);
  const [currbio, setBio] = useState(bio);
  const [profileData, setProfileData] = useState(null);
  const [signedData, setSignedData] = useState(null);
  const [Appointments, setAppointments] = useState(null);
  const [newBio, setNewBio] = useState(bio);

  const [availableTimes, setAvailableTimes] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState(0);

  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const [currReviews, setReviews] = useState(reviews);
  const [inputRating, setInputRating] = useState(0);
  const reviewInput = useRef(null);
  const reviewTitleInput = useRef(null);
  const [currRating, setRating] = useState(overallRating);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);

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
            const filteredAppointments = fetchedAppointments.filter(
              (appointment) =>
                appointment.patient === currentUser.uid &&
                appointment.therapist === id
            );
            setAppointments(filteredAppointments);

            //bookedtimes
            const bookedTimes = fetchedAppointments.reduce(
              (acc, appointment) => {
                const date = dayjs(appointment.time).format("MM/DD/YYYY");
                const time = dayjs(appointment.time).format("h:mm A");
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(time);
                return acc;
              },
              {}
            );
            setAvailableTimes(bookedTimes);

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

        // setSignedData(signedUser.data);
        // setEditReview(signedData.isTherapist);

        // set Calender
        // console.log("bookedTimes");
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
        try {
          setSignedData(signedUser.data);
          setEditReview(signedData.isTherapist);
          
        } catch (error) {
          console.log("reviewError")
          console.log(error)
        }
      } catch (e) {
        console.log("yo");
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (Appointments) {
      const currentDate = dayjs();
      const formatDate = currentDate.format("h:mm A");
      console.group(formatDate)
      // const filteredAppointments = Appointments.filter((appointment) => {
      //   console.log(appointment)
      //   const appointmentDateTime = dayjs(appointment.time);
      //   console.log("pastAppointments");
      //   console.log(appointmentDateTime.format("h:mm A"));

      //   return appointmentDateTime.isBefore(currentDate);
      // });
      // setPastAppointments(filteredAppointments);

      const filteredAppointments = Appointments.filter((appointment) => {
        // Extracting the date and time from the appointment string
        const appointmentDateTime = dayjs(appointment.time);
        const appointmentDateTimeFormated = dayjs(appointmentDateTime, "MM/DD/YYYY h:mm A");
  
        // Check if the appointment date is before the current date
        if (appointmentDateTimeFormated.isBefore(currentDate, 'day')) {
          return true;
        }
  
        // If the appointment date is the same as the current date, check the time
        if (appointmentDateTimeFormated.isSame(currentDate, 'day')) {
          // Check if the appointment time is before the current time
          return appointmentDateTimeFormated.isBefore(currentDate, 'minute');
        }
  
        return false;
      });
      setPastAppointments(filteredAppointments);
    }
    
  }, [Appointments]);
  // COLLEEN
  useEffect(() => {
    // if (Appointments) {
    //   const currentDate = dayjs();
    //   const filteredAppointments = Appointments.filter((appointment) => {
    //     const appointmentDateTime = dayjs(appointment.time);
    //     console.log("Future");
    //     console.log(appointmentDateTime);
    //     return appointmentDateTime.isAfter(currentDate);
    //   });
    //   setFutureAppointments(filteredAppointments);
    // }
    if (Appointments) {
      const currentDate = dayjs();
      const filteredAppointments = Appointments.filter((appointment) => {
        // Extracting the date and time from the appointment string
        const dateTimeString = dayjs(appointment.time); // Assuming the date starts at index 20
        const appointmentDateTime = dayjs(dateTimeString, "MM/DD/YYYY h:mm A");
  
        // Check if the appointment date is after the current date
        return appointmentDateTime.isAfter(currentDate);
      });
      setFutureAppointments(filteredAppointments);
    }
  }, [Appointments]);

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
      console.log("fetchedAppointments")
      console.log(fetchedAppointments);
      const filteredAppointments = fetchedAppointments.filter(
        (appointment) =>
          appointment.patient === currentUser.uid &&
          appointment.therapist === id
      );
      // User can only see their and therapist times
      setAppointments(filteredAppointments);

      const updatedAvailableTimes = { ...availableTimes };

      const selectedDateFormatted = updatedtime.$d;
      // Filter out the selectedTime from the availableTimes for the selectedDate
      console.log("updated");

      // add notifcation to therapist side
      try {
        console.log("ADDING NOTIFICATION TO THERAPIST SIDE");
        const responseTherapistNotifications = await axios.get(
          `http://localhost:5173/profile/notifications/${id}`
        );
        console.log(responseTherapistNotifications.data);
        const currentunRead = responseTherapistNotifications.data.unread;

        try {
          const responseNotifications = await axios.put(
            `http://localhost:5173/profile/notifications/${id}`,
            {
              unread: currentunRead + 1,
              noti_str: [`Upcoming Appointment ${updatedtime}`],
            }
          );
          console.log(responseNotifications);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log("Could not add NOTIFICATION TO THERAPIST SIDE");
        console.log(error);
      }

      setLoading(false);

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
      setReviews(response.data.reviews);
      console.log(response.data.overallRating);
      setRating(response.data.overallRating);
      setAlreadyReviewed(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput2 = async (InputRating, ReviewTitle, Review) => {
    try {
      const response = await axios.put(
        `http://localhost:5173/reviews/${id}/${signedData._id}`,
        {
          reviewId: signedData._id,
          reviewTitle: ReviewTitle,
          reviewerName: signedData.firstName + " " + signedData.lastName,
          review: Review,
          rating: InputRating,
        }
      );
      setReviews(response.data.reviews);
      console.log(response.data.overallRating);
      setRating(response.data.overallRating);
      setAlreadyReviewed(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleId = async () => {
      try {
        const signedUser = await axios.get(
          `http://localhost:5173/profile/${currentUser.uid}`
        );
        if (signedUser.data != null) {
          // console.log("huh");
          setSignedData(signedUser.data);
          setEditReview(signedUser.data.isTherapist);
        }
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setProfileData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    handleId();
  }, [currentUser]);

  useEffect(() => {
    const handleAlreadyReviewed = async () => {
      try {
        const isFound = currReviews.some((obj) => obj._id == signedData._id);
        // console.log(isFound);
        if (isFound) {
          setAlreadyReviewed(true);
        } else {
          setAlreadyReviewed(false);
        }
        // console.log(alreadyReviewed);
      } catch (e) {
        console.log(e);
      }
    };
    handleAlreadyReviewed();
  }, [signedData]);
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
                      {/* {[...Array(9).keys()].map((index) => {
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
                      })} */}
                      {[...Array(9).keys()].map((index) => {
  const time = dayjs(selectedDate)
    .startOf("day")
    .add(9, "hours")
    .add(index, "hours")
    .format("h:mm A");

  // Check if the time slot is before the current date and time
  const isBeforeCurrentTime = dayjs().isAfter(dayjs(selectedDate).add(index, "hours"));

  // Check if the time slot is available
  const isAvailable = !availableTimes[selectedDate.format("MM/DD/YYYY")] ||
    !availableTimes[selectedDate.format("MM/DD/YYYY")].includes(time);

  // Determine if the time slot should be disabled
  const isDisabled = isBeforeCurrentTime || !isAvailable;

  return (
    <button
      className={`timeCalender ${isDisabled ? 'disabled' : ''}`}
      key={index}
      onClick={() => !isDisabled && handleTimeSelection(time)}
    >
      {time}
    </button>
  );
})}
                    </div>
                  </div>
                </Grid>
              </Grid>

              {/* <div className="right-section-header">
                {" "}
                Upcoming Appointments{" "}
              </div> */}
              {/* {Appointments === null || Appointments.length === 0 ? (
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
                    </div>
                  ))}
                </div>
              )} */}
              <div className="right-section-header"> Future Appointments </div>
              {futureAppointments.length > 0 ? (
                <div>
                  {futureAppointments.map((appointment, index) => (
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
              ) : (
                <Typography>No future appointments.</Typography>
              )}

              {/* COLLEEN */}
              <div className="right-section-header"> Past Appointments </div>
              {pastAppointments.length > 0 ? (
                <div>
                  {pastAppointments.map((appointment, index) => (
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
              ) : (
                <Typography>No past appointments.</Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="right-section-header"> Reviews </div>
              <div>
                <Typography component="legend" style={{ marginBottom: '20px', fontSize: 18, fontWeight: "bold"}}>Overall Therapist Rating</Typography>
                <Rating
                  name="text-feedback"
                  value={currRating}
                  readOnly
                  precision={0.5}
                />
                <Box>{currRating ? currRating.toFixed(2) : 0} Stars</Box>
              </div>
              
              <div style={{marginTop: '50px'}}>
              <Typography component="legend" sx={{fontSize:18, fontWeight: 'bold'}}>List of Reviews</Typography>
              {!currReviews && currReviews.length == 0 ?(<div style={{marginTop: '50px'}}>Currently No Reviews</div>) : 
                (<Stack direction ='column' spacing={2}>
                  {currReviews && currReviews.slice(-5).map((item, index) => (
                    <Box key={index} sx={{textAlign: 'left'}}>
                      <Typography sx={{fontSize: 18, fontFamily: 'Arial'}}>{item.reviewerName}</Typography>
                      <Rating  readOnly precision = {0.5} value={item.rating} /> 
                      <Typography sx={{fontWeight: 'bold'}}>{item.reviewTitle}</Typography>
                      <Typography>Review made on {item.reviewDate}</Typography>
                      <Typography sx={{marginTop: '20px'}}>{item.review}</Typography>
                    </Box>
                  ))}
                </Stack>)}
              </div>
              {!editReview ?
              <>
              {alreadyReviewed ?
              <div>
              <div style={{ marginTop: '50px'}} >
               <div className='right-section-header'style={{ marginBottom: '20px'}}> Create Your Review </div>
                 <div style={{marginBottom: '20px'}}>
                 <Typography component="legend">Review Rating</Typography>
                 <Rating
                   name="text-feedback"
                   label ="Review Rating"
                   value ={inputRating}
                   precision={0.5}
                   onChange = {(event, newValue) => {
                     setInputRating(newValue);
                   }}
                 />
                 </div>
                 <TextField
                   inputRef={reviewTitleInput}
                   label="Name of Review"
                   id ="textbox-Name"
                   inputProps={{
                     maxLength:50
                   }}
                 />
                 <TextField
                   inputRef={reviewInput}
                   fullWidth
                   label="Description of Review"
                   id="textbox-Review"
                   // value={currReview}
                   // onChange={event => setCurrReview(event.target.value)}
                   multiline
                   style={{margin: '2vh 0 1vh 0'}}
                   rows={3}
                   inputProps={{
                     maxLength:285
                   }}
                 />
               </div>
               
               <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                 <Button variant="contained" onClick={(event) => { event.preventDefault; handleInput2(inputRating, reviewTitleInput.current.value, reviewInput.current.value)}}>
                   Edit A Review
                 </Button>
               </div>
               </div>
                :
                <div>
                  <div style={{ marginTop: '50px'}} >
                <div className='right-section-header'style={{ marginBottom: '20px'}}> Create Your Review </div>
                  <div style={{marginBottom: '20px'}}>
                  <Typography component="legend">Review Rating</Typography>
                  <Rating
                    name="text-feedback"
                    label ="Review Rating"
                    value ={inputRating}
                    precision={0.5}
                    onChange = {(event, newValue) => {
                      setInputRating(newValue);
                    }}
                  />
                  </div>
                  <TextField
                    inputRef={reviewTitleInput}
                    label="Name of Review"
                    id ="textbox-Name"
                    inputProps={{
                      maxLength:50
                    }}
                  />
                  <TextField
                    inputRef={reviewInput}
                    fullWidth
                    label="Description of Review"
                    id="textbox-Review"
                    // value={currReview}
                    // onChange={event => setCurrReview(event.target.value)}
                    multiline
                    style={{margin: '2vh 0 1vh 0'}}
                    rows={3}
                    inputProps={{
                      maxLength:285
                    }}
                  />
                </div>
                
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <Button variant="contained" onClick={(event) => { event.preventDefault; handleInput(inputRating, reviewTitleInput.current.value, reviewInput.current.value)}}>
                    Submit A Review
                  </Button>
                </div>
                </div> }
              </>
              : 
              <br/>}
            </CustomTabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBioFromPatientView;
