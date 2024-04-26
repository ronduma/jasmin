import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
// import './styles.css';
import { useParams, Link } from "react-router-dom";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TherapistCalender from "./TherapistCalender";

import Expertise from "./Expertise";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Grid item hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Grid>
  );
}

function TherapistBio({ bio, specialty, price, overallRating, reviews}) {
  const { currentUser } = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [newBio, setNewBio] = useState(bio);

  const [Appointments, setAppointments] = useState(null);

  if ((bio = "")) setBio(null);
  const [selectedTopics, setSelectedTopics] = useState(specialty);
  let [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedPrice, setSelectPrice] = useState(price);
  const [newPrice, setNewPrice] = useState(price);

  if (price = "") setSelectPrice("");
  const [currRating, setRating] = useState(overallRating);
  // console.log(overallRating);
  const [currReviews, setReviews] = useState(reviews);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);

  useEffect(() => {
    const userReviews = async () => {
      try{
        console.log(currentUser);
        const response = await axios.get(`http://localhost:5173/reviews/${currentUser.uid}`);
        // console.log(response.data);
      }
      catch(error){
        console.error(error);
      }
    }
    userReviews();
  });
    
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = currentUser.uid;

        const responseMeeting = await axios.get(
          `http://localhost:5173/meeting/therapist/${id}`
        );
        const fetchedAppointments = responseMeeting.data;
        setAppointments(fetchedAppointments); //all appointments
      } catch (e) {
        console.log("yo");
        console.log(e);
      }
    };
    fetchData();
  });

  const putBio = async () => {
    // console.log("curentUser: ", currentUser);
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
    setNewBio(document.getElementById("textbox-bio").value);
    setEditAbout(false);
  };
  const handlePriceChange = async () => {
    axios
      .put("http://localhost:5173/profile/price", {
        uid: currentUser.uid,
        price: selectedPrice,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setNewPrice(selectedPrice);
    setEditAbout(false);
  };

  const handleSelectedTopics = (data) => {
    setSelectedTopics(data);
  };

  //checks ids and sees what is selected and stores that
  const handleCheckboxChange = async () => {
    // axios call to add to database
    axios
      .put("http://localhost:5173/profile/specialty", {
        uid: currentUser.uid,
        specialty: selectedTopics,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditAbout(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  useEffect(() => {
    if (Appointments) {
      const currentDate = dayjs();
      const formatDate = currentDate.format("h:mm A");
      console.group(formatDate)
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

  useEffect(() => {
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
  
  return (
    <div>
      <Grid container spacing={2}>
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
          <Paper style={{ padding: "2vh", height: "100%" }}>
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
                {editAbout ? (
                  ""
                ) : (
                  <IconButton onClick={() => setEditAbout(true)}>
                    <EditIcon />
                  </IconButton>
                )}
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
              <div className="right-section-header">Price</div>
              <FormControl fullWidth>
                <Select
                  onChange={(event) => setSelectPrice(event.target.value)}
                  id="therapist-price"
                  value={selectedPrice}
                  disabled={!editAbout}
                  InputLabelProps={{
                    shrink: selectedPrice || editAbout ? true : false,
                  }}
                >
                  <MenuItem value="">
                    <em>Free</em>
                  </MenuItem>
                  <MenuItem value="Low">$ - Low</MenuItem>
                  <MenuItem value="Medium">$$ - Medium</MenuItem>
                  <MenuItem value="High">$$$ - High</MenuItem>
                </Select>
              </FormControl>
              {editAbout && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton>
                    <CheckCircleIcon
                      onClick={() => {
                        putBio();
                        handleCheckboxChange();
                        handlePriceChange();
                      }}
                    ></CheckCircleIcon>
                  </IconButton>
                  <IconButton>
                    <CancelRoundedIcon
                      onClick={() => {
                        setEditAbout(false);
                        setBio(newBio);
                        setSelectPrice(newPrice);
                      }}
                    ></CancelRoundedIcon>
                  </IconButton>
                </div>
              )}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <div className="right-section-header">Upcoming Availability</div>
              <div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      defaultValue={dayjs()}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      minDate={dayjs().startOf("month")}
                      maxDate={dayjs().add(1, "month").endOf("month")}
                    />
                  </LocalizationProvider>
                </div>
                <div>{selectedDate.$d.toString()}</div>
              </div>

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
                        {appointment.time} with{" "}
                        <Link to={`/patient/${appointment.patient}`}>
                          {appointment.patientName}
                        </Link>
                        :{" "}
                        <a href={appointment.hostRoomUrl} target="_blank">
                          Host Meeting Link
                        </a>
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
              <div className="right-section-header"> Future Appointments </div>
              {futureAppointments.length > 0 ? (
                <div>
                  {futureAppointments.map((appointment, index) => (
                   <div key={index}>
                   <Typography variant="body1">
                     {appointment.time} with{" "}
                     <Link to={`/patient/${appointment.patient}`}>
                       {appointment.patientName}
                     </Link>
                     :{" "}
                     <a href={appointment.hostRoomUrl} target="_blank">
                       Host Meeting Link
                     </a>
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
                      {appointment.time} with{" "}
                      <Link to={`/patient/${appointment.patient}`}>
                        {appointment.patientName}
                      </Link>
                      :{" "}
                      <a href={appointment.hostRoomUrl} target="_blank">
                        Host Meeting Link
                      </a>
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
              ) : (
                <Typography>No past appointments.</Typography>
              )}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>

              <div className='right-section-header'> Reviews </div>
              <div>
                <Typography component="legend" style={{ marginBottom: '20px' }}>Overall Therapist Rating:</Typography>
                <Rating
                name="text-feedback"
                value ={currRating}
                readOnly
                precision={0.01}
                onChange = {(event, newValue) => {
                  setRating(newValue);
                }}
               />
               <Box>{currRating ? currRating : 0} Stars</Box>
              </div>
              <div style={{marginTop: '20px'}}>
              <Typography component="legend">List of Reviews:</Typography>
              {!currReviews ?(<div style={{marginTop: '50px'}}>Currently No Reviews</div>) : 
                (<Stack direction ='column' spacing={2}>
                  {currReviews && currReviews.map((item, index) => (
                    <Card variant='outlined' key={index}>
                      <Typography>Name: {item.reviewerName}</Typography>
                      <Typography>Title: {item.reviewTitle}</Typography>
                      <Typography>Rating: {item.rating}</Typography>
                      <Typography>Date: {item.reviewDate}</Typography>
                      <Typography>Review: {item.review}</Typography>
                    </Card>
                  ))}
                </Stack>)}
              </div>
            </CustomTabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBio;
