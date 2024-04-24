import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  Tooltip
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Expertise = (props) => {
  const subtopics = [
    ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"],
    ["Difficulty in communication, crisis", "Intimate Relations", "Breakup", "Emotional abuse, abusive behavior", "Child-rearing practices", "Betrayal"],
    ["ADHD (Attention Deficit Hyperactivity Disorder)", "Excessive Aggression", "Children with Special Needs", "Loss of Loved Ones", "Adaptation", "Bullying"],
    ["Gestalt", "Existential", "Client-centered therapy", "CBT (Cognitive Behavioral Therapy)", "Positive psychotherapy", "Psychoanalysis",
      "Schema therapy", "Transactional Analysis"],
    ["Clinical Psychologist", "Psychiatrist", "Psychologist", "Consulting psychologist", "Psychotherapist", "Sexologist", "Coach", "Transactional Analysis"]
  ];

  const topics = [
    { label: "Personal Therapy Topics", index: 0 },
    { label: "Couple Therapy", index: 1 },
    { label: "Children Therapy", index: 2 },
    { label: "Therapeutic Approaches", index: 3 },
    { label: "Types of Professionals in Mental Health", index: 4 }
  ];

  const personalTherapySubtopics = [
    ["Fatigue", "Depression", "Irritability", "Anxiety", "Panic Attacks", "Self-Esteem",
      "Loneliness", "Chemical", "Suicide Attempts", "Psychosomatics", "Bipolar Disorder",
      "Food Attitude", "Obsessive Thoughts and Rituals", "Borderline Personality Disorder"],
    ["Romantic Relationships", "Relationship issues", "Sexual relations", "Codependency"],
    ["Self-determination, Job Search", "Burnout", "Procrastination", "Attitude Towards Money"],
    ["Childbirth", "Adaptation, Emigration", "Grief", "Disease Diagnosis", "PTSD"]
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  let first = [];
  let second = [];
  let third = [];
  let fourth = [];
  let fifth = [];

  for (let i = 0; i < subtopics.length; i++) {
    for (let j = 0; j < subtopics[i].length; j++) {
      for (let k = 0; k < props.display.length; k++) {
        if (props.display[k] == subtopics[i][j]) {
          if (i == 0) {
            first.push(props.display[k]);
          } else if (i == 1) {
            second.push(props.display[k]);
          } else if (i == 2) {
            third.push(props.display[k]);
          } else if (i == 3) {
            fourth.push(props.display[k]);
          } else if (i == 4) {
            fifth.push(props.display[k]);
          }
        }
      }
    }
  }

  // console.log(first, second, third, fourth)

  const [personName1, setPersonName1] = useState(first);
  const [personName2, setPersonName2] = useState(second);
  const [personName3, setPersonName3] = useState(third);
  const [personName4, setPersonName4] = useState(fourth);
  const [personName5, setPersonName5] = useState(fifth);
  const [selectedPersonal, setSelectedPersonal] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [specialty, setSpecialty] = useState([]);

  const sendMessageToParent = (specialty) => {
    // Invoke the callback function passed from the parent with data
    props.selected(specialty);
  };

  const handleChange = (event, setState) => {
    const { value } = event.target;

    if (setState === setPersonName1) {
      const updatedIndices = [];

      // Iterate over each selected value
      for (let i = 0; i < value.length; i++) {
        const selectedValue = value[i];
        const selectedIndex = subtopics[0].indexOf(selectedValue);
        updatedIndices.push(selectedIndex);
      }

      // Update selectedPersonal by spreading the existing state and appending new indices
      setSelectedPersonal(updatedIndices);
    }
    setState(value);
  };

  useEffect(() => {
    let items = [];
    for (let i = 0; i < selectedPersonal.length; i++) {
      items.push(personalTherapySubtopics[selectedPersonal[i]]);
    }
    setSelectedSubtopics(items)
  }, [selectedPersonal]);

  useEffect(() => {
    let combined = personName1.concat(personName2.concat(personName3.concat(personName4.concat(personName5.concat(selectedSubtopics.flat())))));
    setSpecialty(combined);
  }, [personName1, personName2, personName3, personName4, personName5, selectedSubtopics]);

  useEffect(() => {
    sendMessageToParent(specialty);
  }, [specialty]);

  return (
    <div>
      {topics.map((topic, index) => (
        <FormControl
          disabled={props.disabled}
          key={topic.label}
          sx={{ m: 1, width: "100%" }}>
          <InputLabel id={`demo-multiple-chip-label-${topic.label}`}>{topic.label}</InputLabel>
          <Select
            multiple
            value={index === 0 ? personName1 : index === 1 ? personName2 : index === 2 ? personName3 : index === 3 ? personName4 : personName5}
            onChange={(event) => {
              if (index === 0) handleChange(event, setPersonName1);
              else if (index === 1) handleChange(event, setPersonName2);
              else if (index === 2) handleChange(event, setPersonName3);
              else if (index === 3) handleChange(event, setPersonName4);
              else handleChange(event, setPersonName5);
            }}
            input={<OutlinedInput id={`select-multiple-chip-${topic.label}`} label={topic.label} />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip variant="outlined" key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {
              topic.index == 0 ?
                subtopics[topic.index].map((name, index) => (
                  <MenuItem key={name} value={name}>
                    {name}
                    <Tooltip title={personalTherapySubtopics[index].join(", ")}>
                      <InfoOutlinedIcon style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </MenuItem>
                ))
                :
                subtopics[topic.index].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))
            }
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default Expertise;
