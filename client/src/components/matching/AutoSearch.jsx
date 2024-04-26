import React, { useState } from 'react';
import { Grid, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function AutoSearch({ therapistList, searchValue, setSearch }) {

  return (
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
  )
}

export default AutoSearch;