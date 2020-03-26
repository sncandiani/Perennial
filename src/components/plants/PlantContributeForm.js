import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";

const PlantContributeForm = props => {
  const [plants, setPlants] = useState({
    userId: parseInt(sessionStorage.getItem("userId")),
    name: "",
    height: "",
    sunExposureTypeId: 1,
    waterRequirementTypeId: 1,
    imageUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sunExposures, setSunExposures] = useState([]);
  const [waterRequirements, setWaterRequirements] = useState([]);
  //value of plants will be taken in with every change

  const getSunExposures = () => {
    API.getSunExposureType().then(sunExposureArr => {
      setSunExposures(sunExposureArr);
    });
  };

  const getWaterRequirements = () => {
    API.getWaterRequirementType().then(waterRequirementArr => {
      setWaterRequirements(waterRequirementArr);
    });
  };

  useEffect(() => {
    getSunExposures();
    getWaterRequirements();
  }, []);

  const handleFieldChange = e => {
    const stateToChange = { ...plants };
    stateToChange[e.target.id] = e.target.value;
    setPlants(stateToChange);
  };

   const sunExpFieldChange = e => {
    const stateToChange = { ...plants };
    stateToChange.sunExposureTypeId = parseInt(e.target.value)
    setPlants(stateToChange)
  }

  const waterReqFieldChange = e => {
    const stateToChange = { ...plants };
    stateToChange.waterRequirementTypeId = parseInt(e.target.value)
    setPlants(stateToChange)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (
      plants.name === "" ||
      plants.height === "" ||
      plants.sunExposureTypeId === null ||
      plants.waterRequirementTypeId === null ||
      plants.imageUrl === ""
    ) {
      window.alert("Please complete all fields.");
    } else {
      setIsLoading(true);
      API.postPlant(plants).then(() => props.history.push("/searchplants"));
    }
  };

  return (
    <form className="contributePlantForm">
      <fieldset className="contributePlantFieldset">
        <div className="formContent">
          <label htmlFor="name">Plant Name:</label> <span></span>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="name"
            placeholder="Plant Name"
          />
        </div>

        <div className="formContent">
          <label htmlFor="height">Height:</label> <span></span>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="height"
            placeholder="Height"
          />
        </div>

        <div className="formContent">
          <label>
            Sun Exposure:
            </label>
            <select className="select" id="sunExposureList" onChange={sunExpFieldChange}>
              {sunExposures.map(sunExposureInfo => {
                 return <option key={sunExposureInfo.id} value={sunExposureInfo.id}>
                 {sunExposureInfo.sunExposure}
               </option>
              })}
               </select>
           
        </div>
        <div className="formContent">
        <label>
            Water Requirements:
            </label>
            <select className="select" id="waterRequirementList" onChange={waterReqFieldChange}>
              {waterRequirements.map(waterRequirementInfo => {
                 return <option key={waterRequirementInfo.id} value={waterRequirementInfo.id}>
                 {waterRequirementInfo.waterRequirement}
               </option>
              })}
               </select>
        </div>
        <div className="formContent">
          <label htmlFor="imageUrl">Image:</label> <span></span>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="imageUrl"
            placeholder="Image Url"
          />
        </div>

        <button
          className="submitButton"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default PlantContributeForm;
