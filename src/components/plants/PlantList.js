import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";
import PlantSearch from "../../components/plants/PlantSearch";

const PlantList = props => {
  const [searchPlants, setSearchPlants] = useState([]);
  const [selectGardens, setSelectGardens] = useState([
    { id: 1, name: "No Gardens Available" }
  ]);
  const [option, setOption] = useState({ value: "" });
  const [text, setText] = useState("");
  const [sunExpOption, setSunExpOption] = useState(0)
  const [waterReqOption, setWaterReqOption] = useState(0)
  const [sunExposures, setSunExposures] = useState([]);
  const [waterRequirements, setWaterRequirements] = useState([]);


  useEffect(() => {
    // setPlants("ldfgkjhdglfkjh");
    API.getUserGardens(props.apiUser).then(info => {
      if (info.gardens.length === 0) {
        const stateToChange = { ...option };
        stateToChange["value"] = selectGardens[0].id;
        setOption(stateToChange);
      } else {
        setSelectGardens(info.gardens);
        const stateToChange = { ...option };
        stateToChange["value"] = info.gardens[0].id;
        setOption(stateToChange);
      }
    });
    getSunExposures();
    getWaterRequirements();
  }, []);
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
  const handleChange = e => {
    const stateToChange = { ...option };
    stateToChange["value"] = parseInt(e.target.value);
    setOption(stateToChange);
  };

  const createRelationshipObj = plantObj => {
    console.log(plantObj)
    const newPlantObj = {
      userId: parseInt(sessionStorage.getItem("userId")),
      name: plantObj.name,
      height: plantObj.height,
      sunExposure: plantObj.sunExposureType.sunExposure,
      waterRequirements: plantObj.waterRequirementType.waterRequirement,
      imageUrl: plantObj.imageUrl,
      hasBeenWatered: false,
      nickname: ""
    };
    

    API.postPlantToPersonalPlant(newPlantObj)
      .then(resp => resp.json())
      .then(plantInfo => {
        const personalPlantGardenObj = {
          gardenId: option.value,
          personalPlantId: plantInfo.id
        };
        API.postPersonalPlantToGarden(personalPlantGardenObj);
        window.alert(`Congratulations! You have added ${newPlantObj.name}`);
      });
  };
  
  
  const setPlants = () => {
    API.getSunExposureAndWaterRequirementType()
    .then(plants => plants
    .filter(plant => plant.name.toLowerCase().includes(text.toLowerCase()) || text === "")
    .filter(plant => plant.sunExposureTypeId === sunExpOption || sunExpOption === 0)
    .filter(plant => plant.waterRequirementTypeId === waterReqOption || waterReqOption === 0)
    ).then((r) => setSearchPlants(!(waterReqOption === 0 && sunExpOption === 0 && text === "") ?  r : []))};

  const handleTextFieldChange = e => setText(e.target.value);
  
  useEffect(() => {
    setPlants();
  }, [text, sunExpOption, waterReqOption]);

  const handleSunExpChange = e =>  setSunExpOption(parseInt(e.target.value));

  const handleWaterReqChange = e =>  setWaterReqOption(parseInt(e.target.value));

  

  return (
    <>
    <div className="contributePlantBtn">
        <button
          type="button"
          onClick={() => props.history.push(`/contributeplant`)}
        >
          Contribute plant
        </button>
      </div>
    <div className="searchPage">
    <div className="searchFields">
      <div className="selectGarden">
        Select Garden: 
        <select className="select" id="myGardenList" onChange={handleChange}>
          {selectGardens[0].name === "No Gardens Available"
            ? selectGardens.map(garden => {
                return (
                  <option key={garden.id} value={garden.id}>
                    {garden.name}
                  </option>
                );
              })
            : selectGardens.map(garden => {
                return (
                  <option key={garden.id} value={garden.id}>
                    {garden.name}
                  </option>
                );
              })}
        </select>
      </div>
        Search by name:
        <input
          id="searchBar"
          type="text"
          onChange={handleTextFieldChange}
        ></input>
        Search by Sun Exposure:
        <select
          className="select"
          id="sunExposureList"
          onChange={handleSunExpChange}
        >
          <option value={0}></option>
          {sunExposures.map(sunExposureInfo => {
            return (
              <option key={sunExposureInfo.id} value={sunExposureInfo.id}>
                {sunExposureInfo.sunExposure}
              </option>
            );
          })}
        </select>
        Search by Water Requirements:
        <select
          className="select"
          id="waterRequirementList"
          onChange={handleWaterReqChange}
        >
          <option value={0}></option>
          {waterRequirements.map(waterRequirementInfo => {
            return (
              <option
                key={waterRequirementInfo.id}
                value={waterRequirementInfo.id}
              >
                {waterRequirementInfo.waterRequirement}
              </option>
            );
          })}
        </select>
    
      </div>
          <div className="searchResults">
            <h3 className="largeTxt">Search Results</h3>
      {searchPlants.map((plant, i) => (
        <PlantSearch
          key={plant.id}
          name={plant.name}
          plantId={plant.id}
          index={i}
          apiUser={props.apiUser}
          userId={plant.userId}
          selectGardens={selectGardens}
          plantObj={plant}
          createRelationshipObj={createRelationshipObj}
          setPlants={setPlants}
          {...props}
        />
      ))}
      </div>
    </div>
    </>
  );
};

export default PlantList;
