import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';


function BuildCard({ therapist }) {
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
          style={{ backgroundColor: "#01382E", border: "10px solid transparent", width: "100%" }}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
}

export default BuildCard;