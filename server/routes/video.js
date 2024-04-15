const express = require('express');
const router = express.Router();
const fetch = require("cross-fetch");

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzEyNDQ5MDg5LCJvcmdhbml6YXRpb25JZCI6MjI0MDcxLCJqdGkiOiI0OTAxYmZhOC0wZGFmLTQ5ZTQtODU2MS0yMzQ1MThjMjJiNDYifQ.su0Lo8043on66Qfgcn_D9A7QP71Rtf9hcN0xKUnZ6O0";

const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
};

router.post('/', async (req, res) => {
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
      res.json(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;