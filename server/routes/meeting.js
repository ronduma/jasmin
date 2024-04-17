const express = require("express");
const router = express.Router();
const users = require("../data/users");
const meetings = require("../data/meetings");
const path = require("path");
const fetch = require("cross-fetch");

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzEyNDQ5MDg5LCJvcmdhbml6YXRpb25JZCI6MjI0MDcxLCJqdGkiOiI0OTAxYmZhOC0wZGFmLTQ5ZTQtODU2MS0yMzQ1MThjMjJiNDYifQ.su0Lo8043on66Qfgcn_D9A7QP71Rtf9hcN0xKUnZ6O0";
const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
};

router.get("/therapist/:id", async (req, res) => {
  const therapistId = req.params.id;
  try {
    const therapist = await meetings.getMeetingsByTimeTherapist(therapistId);
    console.log("GET: therapist id");
    console.log(therapist);
    return res.status(200).json(therapist);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.get('/patient/:id', async (req, res) => {

  const patientId = req.params.id;
  try {
    const patient = await meetings.getMeetingByTimePatients(patientId)
    console.log("GET: patient id")
    console.log(patient)
    return res.status(200).json(patient);
    
  } catch (error) {
    return res.status(404).json(error);
    
  }
  
});

router.post("/", async (req, res) => {
  //generate meeting link

  let hostRoomUrl, roomUrl;
  try {
    const response = await fetch("https://api.whereby.dev/v1/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();

    hostRoomUrl = responseData.hostRoomUrl;
    roomUrl = responseData.roomUrl;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  try {
    // Extract data from the request body
    const { currentUserID, therapistID, time } = req.body;
    // console.log("Matching: Req Body");
    // console.log(req.body);
    // Call the match function
    const currentUser = await meetings.createMeeting(
      currentUserID,
      therapistID,
      time,
      hostRoomUrl,
      roomUrl
    );
    return res.status(200).json({
      success: true,
      message: "User created meeting successfully",
      user: currentUser,
      hostRoomUrl: hostRoomUrl,
      roomUrl: roomUrl,
    });
  } catch (error) {
    // Handle errors
    console.error("Error matching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Extract data from the request body
    const { currentUserID, therapistID, time } = req.body;
    console.log("Matching: Req Body");
    console.log(req.body);
    // Call the match function
    const currentUser = await meetings.deleteMeeting(
      currentUserID,
      therapistID,
      time
    );
    return res.status(200).json({
      success: true,
      message: "User deleted meeting successfully",
      user: currentUser,
    });
  } catch (error) {
    // Handle errors
    console.error("Error deleting meeting:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
