import React, { useState, useEffect } from 'react';
import "../../App.css";
import axios from 'axios';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../matching.css";
import BasicSearchInTherapistForPatientViewInTherapistView from './BasicSearchInTherapistForPatientViewInTherapistView';
import AutoSearch from './AutoSearch';
import Loading from '../loading/Loading';
import BuildCard from './BuildCard';

function Couple_Matching() {
  const [searchValue, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
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
      catch (error) {
        console.log(error);
      }
    }
    handleSubmit();
  }, [searchValue]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setSearch("");
        const response = await axios.get(`http://localhost:5173/therapists/?couple_therapy_topics=${selectedTopic}&therapeutic_approaches=${selectedApproach}&gender=${selectedGender}&price=${selectedPrice}&sort=${selectedSort}&type=couple`);
        setTherapists(response.data);
        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    };
    fetchTherapists();
  }, [selectedTopic, selectedApproach, selectedGender, selectedPrice, selectedSort])

  useEffect(() => {
    const createList = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/therapists/?type=couple`)
        setList(response.data);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    };
    createList();
  })


  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="matching-container">
          <div className="matching-category-choice" style={{ marginLeft: "2vw" }}>Couple Therapy</div>
        </div>
        <Grid
          container
          direction="row"
        >
          <Grid
            container
            direction="row"
            xs={12}
            sm={10}
          > 
            <Grid item xs={12} sm={2}>
              <FormControl sx={{ m: 1, minWidth: "95%" }} size='small'>
                <TextField
                  select
                  value={selectedTopic}
                  id="selectTopic"
                  label="Couple Therapy Topics"
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  InputProps={{ // Adding InputProps prop to customize input styles
                    style: { color: '#008f72' } // Change color here
                  }}
                  InputLabelProps={{ // Adding InputLabelProps prop to customize label styles
                    style: { color: '#008f72', } // Change color here
                  }}
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: 10,
                      color: '#008f72',
                      borderColor: '#008f72',
                    }
                  }}
                >
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="">Couple Therapy Topics</MenuItem>
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Difficulty in communication, crisis">Difficulty in communication, crisis</MenuItem>
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Intimate Relations">Intimate Relations</MenuItem>
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Breakup">Breakup</MenuItem>
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Emotional abuse, abusive behavior">Emotional abuse, abusive behavior</MenuItem>
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Child-rearing practices">Child-rearing practices</MenuItem>
                  <MenuItem sx={{ '&:hover': { backgroundColor: 'rgba(120, 219, 199, 0.4)' } }} value="Betrayal">Betrayal</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <BasicSearchInTherapistForPatientViewInTherapistView
              selectedApproach={selectedApproach} setSelectedApproach={setSelectedApproach}
              selectedGender={selectedGender} setSelectedGender={setSelectedGender}
              selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice}
              selectedSort={selectedSort} setSelectedSort={setSelectedSort}
            />
          </Grid>

          <Grid
            item
            marginLeft="auto"
            marginRight="2vw"
            xs={12}
            sm={1}
          >
            <AutoSearch therapistList={therapistList} searchValue={searchValue} setSearch={setSearch} />

          </Grid>

        </Grid>
      </div>
      {loading && <Loading />}
      <Grid
        container
        justifyContent="center"
        spacing={4}
      >
        {therapists && therapists.length > 0 ? therapists.map((therapist) => (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <BuildCard therapist={therapist} />
          </Grid>
        ))
          :
          !loading && 
          <div className="no-therapist" style={{ alignItems: "center", height:"35vh"}}>
            <h2 style={{padding:"10vh"}}>No Therapists Found</h2>
          </div>
        }
      </Grid>
    </ThemeProvider>
  );
}

export default Couple_Matching;
