import React, { useState, useEffect } from 'react';;
import axios from 'axios';
import { Grid } from '@mui/material';;
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../../App.css";
import "../matching.css";
import Loading from '../loading/Loading';
import BuildCard from './BuildCard';
import AutoSearch from './AutoSearch';
import BasicSearch from './BasicSearch';

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
          !loading && 
          <div className="no-therapist" style={{ alignItems: "center", height:"35vh"}}>
            <h2 style={{padding:"10vh"}}>No Therapists Found</h2>
          </div>
        }
      </Grid>
    </ThemeProvider>
  );
}

export default All_Matching;
