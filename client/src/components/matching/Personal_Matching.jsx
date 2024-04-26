import React, { useState, useEffect } from 'react';
import "../../App.css";
import axios from 'axios';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../matching.css";
import Loading from '../loading/Loading';
import BuildCard from './BuildCard';
import AutoSearch from './AutoSearch';
import BasicSearch from './BasicSearch';

function Personal_Matching() {
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
            sm={8}
          >
            <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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

            <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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

            <FormControl sx={{ m: 1, width: "95%" }}>
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


            <FormControl sx={{ m: 1, width: "95%" }} size='small'>
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



            <BasicSearch
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
          !loading && <div className="no-therapist" style={{ alignItems: "center" }}>
            <br /> <h2>No Therapists Found</h2>
          </div>
        }
      </Grid>
    </ThemeProvider>
  );
}

export default Personal_Matching;
