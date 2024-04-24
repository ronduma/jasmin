import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import "../../App.css";
import Navigation from "../Navigation";
import searchbutton from "../../images/search-button.png";
import axios from 'axios';
import { Card, Avatar, CardActionArea, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../matching.css";
import Autocomplete from '@mui/material/Autocomplete';
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
  const [therapistList, setList] = useState("");
  const [hover, setHover] = useState(false)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#008f72'
      }
    }
  })
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        if (searchValue != '') {
          const response = await axios.get(`http://localhost:5173/therapists/${searchValue}`)
          const value = [response.data];
          setTherapists(value);
        }
      }
      catch (e) {
        console.log(error);
      }
    };
    handleSubmit();
  }, [searchValue]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setSearch("");
        const response = await axios.get(`http://localhost:5173/therapists/?relationship_with_yourself=${selectedYourself}&relationship_with_others=${selectedOthers}&personal_and_professional_development=${selectedDevelopment}&new_living_conditions=${selectedConditions}&therapeutic_approaches=${selectedApproach}&gender=${selectedGender}&price=${selectedPrice}&sort=${selectedSort}&type=personal`);
        setTherapists(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTherapists();
  }, [selectedYourself, selectedOthers, selectedDevelopment, selectedConditions, selectedApproach, selectedGender, selectedPrice, selectedSort]);

  useEffect(() => {
    const createList = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/therapists/?type=personal`)
        setList(response.data);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    };
    createList();
  })

  const buildCard = (therapist) => {
    const personalSpecialty = ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"];

    function checkSpecialty(arr1, arr2) {
      const count = arr1.filter(value => arr2.includes(value)).length;
      return count >= 2
    }

    function getSpecialty(arr1, arr2) {
      return arr1.filter(value => arr2.includes(value));
    }

    return (
      <div className="shadow" >
        <Link to={`/matching/${therapist._id}`} style={{ textDecoration: 'none' }}  >
          <Card variant='outlined'

            style={{ backgroundColor: "#01382E" }}
            sx={{
              flex: "1 0 auto",
              width: 300,
              height: 450,
              paddingBottom: '20px',
              borderRadius: 5,
              border: '1px solid #1e8678',
            }}>

            {therapist.profile_img ?
              <Avatar
                alt="Profile Picture"
                src={`data:image/png;base64,${therapist.profile_img}`}
                sx={{ width: 200, height: 200, mx: 'auto' }}
                style={{ marginTop: '1em' }}
              />
              :
              <AccountCircleIcon
                sx={{ width: 240, height: 'auto', marginBottom: '-24px' }}
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
                  <div className='therapist-detail'>Personal Therapist</div> :
                  getSpecialty(therapist.specialty, personalSpecialty).map((detail) => (
                    <div className='therapist-detail'>{detail}</div>
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
    <div>
      {/* <h1 className="matching-title">Psychologist for Personal Therapy</h1> */}
      <div className="matching-container">
        <div className="matching-category-choice" style={{ marginLeft: "2vw" }} >Personal Therapy</div>
        <div className="search-bar-container">
          <ThemeProvider theme={theme}>
            <Autocomplete
              freeSolo
              id="searchTherapist"
              disableClearable
              options={therapistList ? therapistList.map(option => option.firstName + " " + option.lastName) : []}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  sx={{
                    margin: "1rem 0 0 0",
                    [`& fieldset`]: {
                      borderRadius: 10,
                      color: '#008f72',
                      borderColor: '#008f72',
                    }
                  }}
                  {...params}
                  label="Search Therapist"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style: { color: '#008f72' } // Change color here
                  }}
                  InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                    style: { color: '#008f72' } // Change color here
                  }}

                />
              )}
              value={searchValue}
              sx={{
                width: 300,
              }}
              onChange={(event, newValue) => {
                setSearch(newValue);
              }}
            >
            </Autocomplete>
          </ThemeProvider>

        </div>
      </div>
      <div className="filtersContainer">
        <div className="filters">
          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                value={selectedYourself}
                id="selectYourself"
                label="Relationship With Yourself"
                onChange={(e) => setYourself(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>Relationship With Yourself Topics</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Anxiety">Anxiety</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Bipolar Disorder">Bipolar Disorder</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Borderline Personality Disorder">Borderline Peronsality Disorder</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Chemicals">Chemicals</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Depression">Depression</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Fatigue">Fatigue</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Food Attitude">Food Attitude</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Irritability">Irritability</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Loneliness">Loneliness</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Obsessive thoughts and rituals">Obsessive thoughts and rituals</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Panic attacks">Panic attacks</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Psychosomatics">Psychosomatics</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Self-esteem">Self-esteem</MenuItem >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Suicide attempts">Suicide attempts</MenuItem >
              </TextField>
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                id="selectOthers"
                label="Relationship With Others"
                value={selectedOthers}
                onChange={(e) => setOthers(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>Relationships with Others</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Romantic relationship">Romantic relationship</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Relationship issues">Relationship issues</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Sexual relations">Sexual relations</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Codependency">Codependency</MenuItem>
              </TextField>
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField
                select
                id="selectDevelopment"
                label="Personal and Professional development"
                value={selectedDevelopment}
                onChange={(e) => setDevelopment(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>Personal and Professional development</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Self-determination, job search">Self-determination, job search</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Burnout">Burnout</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Procrastination">Procrastination</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Attitude towards money">Attitude towards money</MenuItem>
              </TextField>
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                id="selectCondition"
                label="New Living Conditions"
                value={selectedConditions}
                onChange={(e) => setConditions(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>New Living Conditions</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Adaptation, emigration">Adaptation, emigration</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Grief">Grief</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Disease diagnosis">Disease diagnosis</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="PTSD">PTSD</MenuItem>
              </TextField>
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                id="selectApproach"
                label="Therapeutic Approaches"
                value={selectedApproach}
                onChange={(e) => setSelectedApproach(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>Therapeutic Approaches</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Gestalt">Gestalt</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Existential">Existential</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Client-centered therapy">Client-centered therapy</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="CBT (Cognitive Behavioral Therapy)">CBT (Cognitive Behavioral Therapy)</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Positive psychotherapy">Positive psychotherapy</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Psychoanalysis">Psychoanalysis</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Schema therapy">Schema therapy</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Transactional Analysis">Transactional Analysis</MenuItem>
              </TextField>
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                id="selectGender"
                label="Select Gender"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>Select Gender</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Male">Male</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Female">Female</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Other">Other</MenuItem>
              </TextField>
            </FormControl>

          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                id="selectPrice"
                label="Select Price"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>Select Price</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Low">$ - Low</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Medium">$$ - Medium</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="High">$$$ - High</MenuItem>
              </TextField>
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
              <TextField
                select
                id="selectSort"
                label="Sort By"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                InputProps={{ // Adding InputProps prop to customize input styles
                  style: { color: '#008f72' } // Change color here
                }}
                InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                  style: { color: '#008f72' } // Change color here
                }}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 10,
                    color: '#008f72',
                    borderColor: '#008f72',
                  }
                }}
              >
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value=""><em>None</em></MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="first_name_order">Order By First Name</MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="last_name_order">Order By Last Name</MenuItem>
              </TextField>
            </FormControl>
          </ThemeProvider>
        </div>
        {/* Render psychologist profiles filtered */}
        <br />
      </div>
      <div>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: "20px", alignItems: "flex-start",
          margin: "20px", paddingBottom: "50px"
        }}>
          {loading && <>
            <Card variant='outlined'
              sx={{
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
            <Card variant='outlined'
              sx={{
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
            <Card variant='outlined'
              sx={{
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
            <Card variant='outlined'
              sx={{
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
