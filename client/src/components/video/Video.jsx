import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [meetingData, setMeetingData] = useState(null);

  useEffect(() => {
    async function fetchMeetingData() {
      try {
        const response = await axios.post(`http://localhost:5173/video`);
        setMeetingData(response.data);
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      }
    }

    fetchMeetingData();
  }, []);

  return (
    <div>
      {meetingData ? (
        <div>
          <p>Room URL: {meetingData.roomUrl}</p>
          <p>Host room URL: {meetingData.hostRoomUrl}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;