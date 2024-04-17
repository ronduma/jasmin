import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import "../../App.css";
import Navigation from "../Navigation";
import searchbutton from "../../images/search-button.png";
import axios from 'axios';
import {Card, Avatar, CardActionArea,CardMedia, CardContent, Grid, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../matching.css";

function Personal_Matching() {
  //   const {currentUser} = useContext(AuthContext);
  const [searchValue, setSearch] = useState("");
  const [selectedYourself, setYourself] = useState("");
  const [selectedOthers, setOthers] = useState("");
  const [selectedDevelopment, setDevelopment] = useState("");
  const [selectedConditions, setConditions] = useState("");
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

  useEffect(() => {
    const fetchTherapists = async () => {
      try{
        console.log(typeof selectedYourself);
        const response = await axios.get(`http://localhost:5173/therapists/?relationship_with_yourself=${selectedYourself}&relationship_with_others=${selectedOthers}&personal_and_professional_development=${selectedDevelopment}&new_living_conditions=${selectedConditions}&therapeutic_approaches=${selectedApproach}&gender=${selectedGender}&price=${selectedPrice}&sort=${selectedSort}&type=personal`);
        setTherapists(response.data);
        setLoading(false);
      }catch(error){
        console.error(error);
      }
    };
    fetchTherapists();
  });
  
  const buildCard = (therapist) => {
    const personalSpecialty = ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"];
    
    function checkSpecialty(arr1, arr2){
      const count = arr1.filter(value => arr2.includes(value)).length;
      return count >= 2
    }

    function getSpecialty(arr1, arr2){
      return arr1.filter(value => arr2.includes(value));
    }

    return(
      <div className = "shadow" >
        <Link to={`/matching/${therapist._id}`} >
          <Card variant ='outlined'
          style ={{backgroundColor : "#01382E"}}
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
              <Typography className="therapist-name" fontSize={36}>
                {therapist.firstName + " "} {therapist.lastName}
              </Typography>
              <Typography className='detail-container'>
                <div className='therapist-detail'>
                {therapist.location}
                </div>
                <div className='therapist-detail'>
                {"Age: " + therapist.age}
                </div>
                <div className='therapist-detail'>
                {therapist.gender}
                </div>
                {therapist.price ? 
                <div className='therapist-detail'>
                  {therapist.price}
                </div> :
                <div className='therapist-detail'>
                  Free
                </div>
                }
                {checkSpecialty(therapist.specialty, personalSpecialty) ? 
                <div className = 'therapist-detail'>Personal Therapist</div> :
                getSpecialty(therapist.specialty, personalSpecialty).map((detail) => (
                  <div className = 'therapist-detail'>{detail}</div>
                ))}
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
          value={selectedYourself}
          onChange={(e) => setYourself(e.target.value)}
          className ="custom-select"
        >
          <option value="">Relationship With Yourself Topics</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Bipolar Disorder">Bipolar Disorder</option> 
          <option value="Borderline Personality Disorder">Borderline Peronsality Disorder</option> 
          <option value="Chemicals">Chemicals</option> 
          <option value="Depression">Depression</option>
          <option value="Fatigue">Fatigue</option>
          <option value="Food Attitude">Food Attitude</option>
          <option value="Irritability">Irritability</option>
          <option value="Loneliness">Loneliness</option>
          <option value="Obsessive thoughts and rituals">Obsessive thoughts and rituals</option>
          <option value="Panic attacks">Panic attacks</option>
          <option value="Psychosomatics">Psychosomatics</option>
          <option value="Self-esteem">Self-esteem</option>
          <option value="Suicide attempts">Suicide attempts</option>
        </select>
        <select
          value={selectedOthers}
          onChange={(e) => setOthers(e.target.value)}
          className ="custom-select"
        >
          <option value="">Relationships with Others</option>
          <option value="Romantic relationship">Romantic relationship</option>
          <option value="Relationship issues">Relationship issues</option>
          <option value="Sexual relations">Sexual relations</option>
          <option value="Codependency">Codependency</option>
        </select>
        <select
          value={selectedDevelopment}
          onChange={(e) => setDevelopment(e.target.value)}
          className ="custom-select"
        >
          <option value="">Personal and Professional development</option>
          <option value="Self-determination, job search">Self-determination, job search</option>
          <option value="Burnout">Burnout</option>
          <option value="Procrastination">Procrastination</option>
          <option value="Attitude towards money">Attitude towards money</option>
        </select>
        <select
          value={selectedConditions}
          onChange={(e) => setConditions(e.target.value)}
          className ="custom-select"
        >
          <option value="">New Living Conditions</option>
          <option value="Adaptation, emigration">Adaptation, emigration</option>
          <option value="Grief">Grief</option>
          <option value="Disease diagnosis">Disease diagnosis</option>
          <option value="PTSD">PTSD</option>
        </select>
        
        <select
          value={selectedApproach}
          onChange={(e) => setSelectedApproach(e.target.value)}
          className ="custom-select"
        >
          <option value="">Therapeutic Approaches</option>
          <option value="Gestalt">Gestalt</option>
          <option value="Existential">Existential</option>
          <option value="Client-centered therapy">Client-centered therapy</option>
          <option value="CBT (Cognitive Behavioral Therapy)">CBT (Cognitive Behavioral Therapy)</option>
          <option value="Positive psychotherapy">Positive psychotherapy</option>
          <option value="Psychoanalysis">Psychoanalysis</option>
          <option value="Schema therapy">Schema therapy</option>
          <option value="Transactional Analysis">Transactional Analysis</option>
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
          <option value="first_name_order">Order By First Name</option>
          <option value="last_name_order">Order By Last Name</option>
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

export default Personal_Matching;
