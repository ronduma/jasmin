
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "../App.css";
import searchbutton from "../images/search-button.png";
import axios from 'axios';
import {Card, Avatar, CardActionArea,CardMedia, CardContent, Grid, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./matching.css";

function Matching() {
  //   const {currentUser} = useContext(AuthContext);
  const [searchValue, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedApproach, setSelectedApproach] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [therapists, setTherapists] = useState("");
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const handleSearch = (e) => {
    // Handle search functionality
  };

  const linkStyle = {
    textDecoration: 'none',
    borderRadius: 25,
    boxShadow: hover ? '5px 5px 15px rgba(0,0,0,0.3)' : '',
    transition: 'box-shadow 0.3s ease-in-out'
  };

  useEffect(() => {
    const fetchTherapists = async () => {
      try{
        const response = await axios.get(`http://localhost:5173/therapists`);
        
        setTherapists(response.data);
        setLoading(false);

      }catch(error){
        console.error(e);
      }
    };
    fetchTherapists();
  })
  
  const buildCard = (therapist) => {
    return(
      <div className = "shadow" >
        <Link to={`/matching/${therapist._id}`} >
          <Card variant ='outlined'
            sx = {{
                  flex: "1 0 auto",
                  width: 300,
                  paddingBottom: '20px',
                  borderRadius: 5,
                  border: '1px solid #1e8678',
            }}>
            
            {therapist.profile_img ?
              <Avatar
              alt="Profile Picture"
              src={`data:image/png;base64,${therapist.profile_img}`}
              sx={{ width: 200, height: 200, mx: 'auto'}}
              style={{marginTop: '1em'}}
            />
            :
            <AccountCircleIcon 
              sx={{width: 240, height: 'auto', marginBottom: '-24px'}}
            />
            }

            
            <CardContent>
              <Typography>
                {therapist.firstName + " "} {therapist.lastName}
              </Typography>
              <Typography>
                {therapist.location}
              </Typography>
              <Typography>
                {therapist.age}
              </Typography>
              <Typography>
                {therapist.gender}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    )
  };
  // console.log(typeof therapists);
  return (
    <div className="matching">
      <h1 className="matching-title">Psychologist for Personal Therapy</h1>
      <div className="matching-container">
      <div className="matching-category-choice">Personal Therapy</div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={searchbutton} alt="Search"/>
          </button>
        </div>
      </div>
      </div>
    <div className="filtersContainer">
      <div className="filters">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Topic</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Depression">Depression</option>
          <option value="Relationship Issues">Relationship Issues</option>
        </select>
        <select
          value={selectedApproach}
          onChange={(e) => setSelectedApproach(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Approach</option>
        </select>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Price</option>
          <option value="Low">$ - Low</option>
          <option value="Medium">$$ - Medium</option>
          <option value="High">$$$ - High</option>
        </select>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className ="custom-select"
        >
          <option value="">No sorting</option>
        </select>
      </div>
      {/* Render psychologist profiles filtered */}
    <br/>
    </div>
    <div>
    <div style={{ display: 'flex', flexWrap: 'wrap', 
                  gap: "20px", alignItems:"flex-start", 
                  margin: "20px", paddingBottom: "50px"}}>
      {loading && <>
        <Card variant ='outlined'
        sx = {{
              // flex: "1 0 auto",
              width: 350,
              height: 'auto',
              paddingBottom: '20px',
              borderRadius: 5,
              border: '1px solid #1e8678',
        }}>
        <AccountCircleIcon sx={{ width: 300, height: 200 }} />
        <CardContent>
          <Typography>Loading...</Typography>
          <Typography>Loading...</Typography>
          <Typography>Loading...</Typography>
          <Typography>Loading...</Typography>
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
       <Card variant ='outlined'
       sx = {{
             // flex: "1 0 auto",
             width: 350,
             height: 'auto',
             paddingBottom: '20px',
             borderRadius: 5,
             border: '1px solid #1e8678',
       }}>
       <AccountCircleIcon sx={{ width: 300, height: 200 }} />
       <CardContent>
         <Typography>Loading...</Typography>
         <Typography>Loading...</Typography>
         <Typography>Loading...</Typography>
         <Typography>Loading...</Typography>
         <Typography>Loading...</Typography>
       </CardContent>
     </Card>
      <Card variant ='outlined'
      sx = {{
            // flex: "1 0 auto",
            width: 350,
            height: 'auto',
            paddingBottom: '20px',
            borderRadius: 5,
            border: '1px solid #1e8678',
      }}>
      <AccountCircleIcon sx={{ width: 300, height: 200 }} />
      <CardContent>
        <Typography>Loading...</Typography>
        <Typography>Loading...</Typography>
        <Typography>Loading...</Typography>
        <Typography>Loading...</Typography>
        <Typography>Loading...</Typography>
      </CardContent>
    </Card>
     <Card variant ='outlined'
     sx = {{
           // flex: "1 0 auto",
           width: 350,
           height: 'auto',
           paddingBottom: '20px',
           borderRadius: 5,
           border: '1px solid #1e8678',
     }}>
     <AccountCircleIcon sx={{ width: 300, height: 200 }} />
     <CardContent>
       <Typography>Loading...</Typography>
       <Typography>Loading...</Typography>
       <Typography>Loading...</Typography>
       <Typography>Loading...</Typography>
       <Typography>Loading...</Typography>
     </CardContent>
   </Card>
   </>}
      {therapists && therapists.map((therapist) => buildCard(therapist))}
    </div>
    </div>
    </div>
  );
}

export default Matching;
