import React, { useState, useEffect } from 'react';;
import "../../App.css";
import axios from 'axios';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import "../matching.css";
import Loading from '../loading/Loading';
import BuildCard from './BuildCard';

function All_Matching() {
  const [searchValue, setSearch] = useState("");
  const [selectedApproach, setSelectedApproach] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [therapists, setTherapists] = useState("");
  const [loading, setLoading] = useState(true);
  const [therapistList, setList] = useState("");

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

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="matching-container">
          <div className="matching-category-choice" style={{ marginLeft: "2vw" }}>Therapist Options</div>
        </div>
        <Grid
          container
          direction="row"
        >
          <Grid
            container
            direction="row"
            xs={12}
            sm={8}
          >
            <Grid item xs={12} sm={3}>
              <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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
            <Grid item xs={12} sm={3}>
              <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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
            <Grid item xs={12} sm={3}>
              <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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
            <Grid item xs={12} sm={3}>
              <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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

          <Grid
            item
            marginLeft="auto"
            marginRight="2vw"
            xs={12}
            sm={1}
          >
            <Grid item>
              <FormControl sx={{ m: 1, width: '98%' }} size='small'>
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

      {loading && <Loading />}
      <Grid
        container
        justifyContent="center"
        spacing={4}
      >
        {therapists && therapists.map((therapist) => (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <BuildCard therapist={therapist} />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default All_Matching;
