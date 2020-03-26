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
  const [sunExposures, setSunExposures] = useState([]);
  const [waterRequirements, setWaterRequirements] = useState([]);

  const setPlants = textValue => {
    API.getSunExposureAndWaterRequirementType().then(plants => {
      const filteredPlants = plants.filter(plant => {
        return plant.name.toLowerCase().includes(textValue) === true;
      });
      setSearchPlants(filteredPlants);
    });
  };

  useEffect(() => {
    setPlants("ldfgkjhdglfkjh");
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
    getSunExposures()
    getWaterRequirements()
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
    const newPlantObj = {
      userId: parseInt(sessionStorage.getItem("userId")),
      name: plantObj.name,
      height: plantObj.height,
      sunExposure: plantObj.sunExposure,
      waterRequirements: plantObj.waterRequirements,
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
  const handleTextFieldChange = e => {
    const stateToChange = { ...text };
    stateToChange[e.target.id] = e.target.value;
    setText(stateToChange);
    setPlants(e.target.value);
  };

  const handleSunExpChange = e => {
      const stateToChange = {...sunExposures}
      stateToChange[e.target.id] = parseInt(e.target.value)
      API.getSunExposureAndWaterRequirementType().then(plants => {
        const filteredPlants = plants.filter(plant => {
          return plant.sunExposureTypeId === stateToChange.sunExposureList;
        });
        setSearchPlants(filteredPlants);
      });
  }

  const handleWaterReqChange = e => {
    const stateToChange = {...waterRequirements}
    stateToChange[e.target.id] = parseInt(e.target.value)
    API.getSunExposureAndWaterRequirementType().then(plants => {
      const filteredPlants = plants.filter(plant => {
        return plant.waterRequirementTypeId === stateToChange.waterRequirementList;
      });
      setSearchPlants(filteredPlants);
    });
}
  return (
    <>
    <p>
      <button
        type="contributeBtn"
        onClick={() => props.history.push(`/contributeplant`)}
      >
        Contribute plant
      </button>
    </p>
      <p>
        <label>Select Garden</label>
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
      </p>
  
      Search by name:
      <input
        id="searchBar"
        type="text"
        onKeyPress={handleTextFieldChange}
      ></input>
      <p>Search by Sun Exposure: </p>
      <select className="select" id="sunExposureList" onChange={handleSunExpChange}>
               {sunExposures.map(sunExposureInfo => {
                 return <><option></option><option key={sunExposureInfo.id} value={sunExposureInfo.id}>
                 {sunExposureInfo.sunExposure}
               </option></>
              })} 
    </select>
      <p>Search by Water Requirements: </p>
      <select className="select" id="waterRequirementList" onChange={handleWaterReqChange}>
               {waterRequirements.map(waterRequirementInfo => {
                 return <><option></option> <option key={waterRequirementInfo.id} value={waterRequirementInfo.id}>
                 {waterRequirementInfo.waterRequirement}
               </option></>
              })} 
    </select>
      {searchPlants.map(plant => (
        <PlantSearch
          key={plant.id}
          name={plant.name}
          plantId={plant.id}
          apiUser={props.apiUser}
          userId={plant.userId}
          selectGardens={selectGardens}
          plantObj={plant}
          createRelationshipObj={createRelationshipObj}
          setPlants={setPlants}
          {...props}
        />
      ))}
     
    </>
  );
};

export default PlantList;
