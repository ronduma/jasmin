import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import "../App.css";
import Navigation from "./Navigation";
import searchbutton from "../images/search-button.png";

function Matching() {
  //   const {currentUser} = useContext(AuthContext);
  const [searchValue, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedApproach, setSelectedApproach] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [therapists, setTherapists] = useState("");
  const handleSearch = (e) => {
    // Handle search functionality
  };

  useEffect(() => {
    const fetchTherapists = async () => {
      try{
        console.log("here!");
        const response = await axios.get(`http://localhost:5000/therapists`);
        console.log("IN USE EFFECT!");
        setTherapists(response.data);
      }catch(error){
        console.error("Error in fetching therapist data");
      }
    };
    fetchTherapists();
  })
  return (
    <div className="matching">
      <h1 className="matching-title">Psychologist for Personal Therapy</h1>
      <div className="matching-container">
      <div className="matching-category-choice">Personal Therapy</div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={handleSearch}>
            <img className="search-button" src={searchbutton} alt="Search" />
          </button>
        </div>
      </div>
      </div>
    <div className="filtersContainer">
      <div className="filters">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Topic</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Depression">Depression</option>
          <option value="Relationship Issues">Relationship Issues</option>
        </select>
        <select
          value={selectedApproach}
          onChange={(e) => setSelectedApproach(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Approach</option>
        </select>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className ="custom-select"
        >
          <option value="">Select Price</option>
          <option value="Low">$ - Low</option>
          <option value="Medium">$$ - Medium</option>
          <option value="High">$$$ - High</option>
        </select>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className ="custom-select"
        >
          <option value="">No sorting</option>
        </select>
      </div>
      {/* Render psychologist profiles filtered */}
    </div>
    {therapists}
    <div>
      
    </div>
    </div>
  );
}

export default Matching;
