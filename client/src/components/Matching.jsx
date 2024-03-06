import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import "../App.css";
import Navigation from "./Navigation";
import searchbutton from "../images/search-button.png";
import axios from 'axios';
import {Card, Avatar, CardActionArea,CardMedia, CardContent, Grid, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Matching() {
  //   const {currentUser} = useContext(AuthContext);
  const [searchValue, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedApproach, setSelectedApproach] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [therapists, setTherapists] = useState("");
  const handleSearch = (e) => {
    // Handle search functionality
  };

  useEffect(() => {
    const fetchTherapists = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/therapists`);
        
        setTherapists(response.data);
      }catch(error){
        console.error(e);
      }
    };
    fetchTherapists();
  })
  
  const buildCard = (therapist) => {
    return(
      <Grid item xs={3}>
        <Card variant ='outlined'
        sx = {{maxWidth: 350,
              height: 'auto',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingBottom: '20px',
              borderRadius: 5,
              border: '1px solid #1e8678',
        }}>
        <Avatar
            alt="Profile Picture"
            src={therapist.profile_img}
            sx={{ width: 24, height: 24 }}
          />
          <AccountCircleIcon
            sx={{ width: "auto", height: 200 }}
          />
        <CardContent>
          <Typography>
            {therapist.firstName}
          </Typography>
          <Typography>
            {therapist.lastName}
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
      </Grid>
    )
  };
  console.log(typeof therapists);
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
    <Grid container spacing={6} justifyContent="center">
      {therapists && therapists.map((therapist) => buildCard(therapist))}
    </Grid>
    </div>
    </div>
  );
}

export default Matching;
