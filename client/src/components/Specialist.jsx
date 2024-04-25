import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import "../App.css";
import Navigation from "./Navigation";
import searchbutton from "../images/search-button.png";
import axios from 'axios';
import {Box,Button, Card, Avatar, CardActionArea,CardMedia, CardContent, Grid, Typography, createTheme, ThemeProvider} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import image5 from '../images/image5.jpg';
import image6 from'../images/image6.jpg';
import image7 from'../images/image7.jpg';
const theme = createTheme({
    palette: {
      guga: {
        light: '#68ac8f',
        main: '#439873',
        dark: '#2e6a50',
        contrastText: '#fff',
      },  
    },
  });

function Specialist(){
     return(
        <div>
            <Box
            className="homeBanner"
            display ="flex" 
            justifyContent = "center" 
            alignItems="center"
            sx={{
                backgroundColor:"white",
            }}>
                <h2 marginTop={100}> All Specialists</h2>
            </Box>
            <Box
            sx={{
                backgroundColor:"white",
                py:"15vh"
            }}>
            <Grid container spacing={10} justifyContent="center">
                <Grid item>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        sx={{height: 140}}
                        image = {image5}
                        title ="Personal Therapy"
                    
                    />
                    <ThemeProvider theme={theme}>
                    <Button color="guga" 
                    variant='contained' 
                    component= {NavLink} to='/personal_matching'
                    style={{
                        width: '250px',
                        height: '60px'
                    }}>Personal Therapy</Button>
                    </ThemeProvider>
                </Card>
                </Grid> 
                <Grid item>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        sx={{height: 140}}
                        image = {image6}
                        title ="Couple Therapy"
                    
                    />
                    <ThemeProvider theme={theme}>
                    <Button color="guga" 
                    variant='contained' 
                    component= {NavLink} to='/couple_matching'
                    style={{
                        width: '250px',
                        height: '60px'
                    }}>Couple Therapy</Button>
                    </ThemeProvider>
                </Card>
                </Grid>
                <Grid item>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        sx={{height: 140}}
                        image = {image7}
                        title ="Children Therapy"
                    
                    />
                    <ThemeProvider theme={theme}>
                    <Button color="guga" 
                    variant='contained' 
                    component= {NavLink} to='/children_matching'
                    style={{
                        width: '250px',
                        height: '60px'
                    }}>Children Therapy</Button>
                    </ThemeProvider>
                </Card>
                </Grid>
            </Grid>
            </Box>
        </div>
     );
}

export default Specialist;