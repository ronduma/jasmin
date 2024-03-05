import React, {useContext, useState} from 'react';

import PatientBio from './PatientBio';
import TherapistBio from './TherapistBio';


function Bio(isTherapist) {
  if (isTherapist){
    console.log(isTherapist)
    return (
      <TherapistBio />
    )
  }
  else{
    console.log(isTherapist)
    return (
      <PatientBio />
    )
  }
}

export default Bio;
