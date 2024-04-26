import React from 'react';
import { Grid, FormControl, TextField, MenuItem } from '@mui/material';


function BasicSearchInTherapistForPatientViewInTherapistView({ selectedApproach, setSelectedApproach, selectedGender, setSelectedGender, selectedPrice, setSelectedPrice, selectedSort, setSelectedSort }) {
  return (<>
    <Grid item xs={12} sm={2}>
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
    <Grid item xs={12} sm={2}>
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
    <Grid item xs={12} sm={2}>
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
    <Grid item xs={12} sm={2}>
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
  </>)
}

export default BasicSearchInTherapistForPatientViewInTherapistView;