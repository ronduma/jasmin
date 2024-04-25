import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import "../../App.css";
import Navigation from "../Navigation";
import searchbutton from "../../images/search-button.png";
import axios from 'axios';
import { Card, Avatar, CardActionArea, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import VerifiedIcon from '@mui/icons-material/Verified';
import "../matching.css";
import Loading from '../loading/Loading';

function All_Matching() {
  //   const {currentUser} = useContext(AuthContext);
  const [searchValue, setSearch] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedApproach, setSelectedApproach] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [therapists, setTherapists] = useState("");
  const [loading, setLoading] = useState(true);
  const [therapistList, setList] = useState("");
  const [hover, setHover] = useState(false);

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
  }, [searchValue])

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/therapists/?therapeutic_approaches=${selectedApproach}&gender=${selectedGender}&price=${selectedPrice}&sort=${selectedSort}`);
        setTherapists(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTherapists();
  }, [selectedApproach, selectedGender, selectedPrice, selectedSort])

  useEffect(() => {
    const createList = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/therapists`)
        setList(response.data);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    };
    createList();
  }, [])

  const buildCard = (therapist) => {
    const personalSpecialty = ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"];
    const coupleSpecialty = ["Difficulty in communication, crisis", "Intimate Relations", "Breakup", "Emotional abuse, abusive behavior", "Child-rearing practices", "Betrayal"];
    const childrenSpecialty = ["ADHD (Attention Deficit Hyperactivity Disorder)", "Excessive Aggression", "Children with Special Needs", "Loss of Loved Ones", "Adaptation", "Bullying"];
    function checkSpecialty(arr1, arr2) {
      const count = arr1.filter(value => arr2.includes(value)).length;
      return count > 2
    }
    return (
      <div className="shadow">
        <Link to={`/matching/${therapist._id}`} style={{ textDecoration: 'none' }}>
          <Card variant='outlined'
            style={{ backgroundColor: "#01382E", border: "10px solid transparent", width:"100%" }}
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography className='therapist-name' fontSize={36}>
                  {therapist.firstName + " " + therapist.lastName}
                </Typography>
                {therapist.pdf_files.length > 0 &&
                  <span> <VerifiedIcon style={{ "color": "#FFD700" }} /> </span>
                }
              </div>
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
                  <div className='therapist-detail'>Personal Therapist</div> : null
                }
                {checkSpecialty(therapist.specialty, coupleSpecialty) ?
                  <div className='therapist-detail'>Couple Therapist</div> : null
                }
                {checkSpecialty(therapist.specialty, childrenSpecialty) ?
                  <div className='therapist-detail'>Children Therapist</div> : null
                }
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    )
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="matching-container">
          <div className="matching-category-choice" style={{ marginLeft: "2vw" }}>Therapist Options</div>
        </div>
          <Grid container>
            <Grid container xs={12} sm={8}>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 150 }} size='small'>
                  <TextField
                    select
                    value={selectedApproach}
                    id="selectApproach"
                    label="Therapeutic Approaches"
                    onChange={(e) => setSelectedApproach(e.target.value)}
                    InputProps={{ // Adding InputProps prop to customize input styles
                      style: { color: '#008f72' } // Change color here
                    }}
                    InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                      style: { color: '#008f72', width: "120px" } // Change color here
                    }}
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 10,
                        color: '#008f72',
                        borderColor: '#008f72',
                      }
                    }}
                  >
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="">Therapeutic Approaches</MenuItem>
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
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 150 }} size='small'>
                  <TextField
                    select
                    value={selectedGender}
                    id='selectGender'
                    label="Gender"
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
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="">Select Gender</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Male">Male</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Female">Female</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Other">Other</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 150 }} size='small'>
                  <TextField
                    select
                    value={selectedPrice}
                    id="selectPrice"
                    label='Price'
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
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="">Select Price</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Low">$ - Low</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Medium">$$ - Medium</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="High">$$$ - High</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 150 }} size='small'>
                  <TextField
                    select
                    value={selectedSort}
                    id="selectSort"
                    label="Sort By"
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
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="">No sorting</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="first_name_order">Order By First Name</MenuItem>
                    <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="last_name_order">Order By Last Name</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 150 }} size='small'>
                  <Autocomplete
                    freeSolo
                    id="searchTherapist"
                    disableClearable
                    options={therapistList ? therapistList.map(option => option.firstName + " " + option.lastName) : []}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          // m: 1,
                          // width: 300,
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
                    onChange={(event, newValue) => {
                      setSearch(newValue);
                    }}
                  >
                  </Autocomplete>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
      </div>
          {/* Render psychologist profiles filtered */}






      {loading && <Loading />} 
      <Grid 
        container 
        justifyContent="center"
        spacing={4}
      >
        {therapists && therapists.map((therapist) => (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <div>
              {buildCard(therapist)}
            </div>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default All_Matching;
