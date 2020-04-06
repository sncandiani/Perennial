import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";
import PlantCard from "../../components/plants/PlantCard";
import PersonalPlantModal from "../plants/PersonalPlantModal"
const GardenDetail = props => {
  const [garden, setGarden] = useState({
    userId: parseInt(sessionStorage.getItem("userId")),
    name: "",
    dateCreated: "",
    gardenLocation: "",
    imageUrl: ""
  });
  const [plants, setPlants] = useState([]);

  const [editPlant, setEditPlant] = useState({});
  const [modal, setModal] = useState(false);

  
  const getGardens = () => {
    API.getSpecificGarden(props.gardenId).then(specificGarden => {
      setGarden({
        name: specificGarden.name,
        dateCreated: specificGarden.dateCreated,
        gardenLocation: specificGarden.gardenLocation,
        imageUrl: specificGarden.imageUrl
      });
    });
  };

  const getAssociatedPlants = () => {
    API.findAssociatedPlants().then(gardenAndPlantInfo => {
      const plantArr = gardenAndPlantInfo.filter(
        info => info.gardenId === props.gardenId
      );
      setPlants(plantArr);
    });
  };

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false);
    getAssociatedPlants();
  }

  useEffect(() => {
    getGardens();
    getAssociatedPlants();
  }, []);

  return (
    <>
      <div className="gardenDetailSect">
        <h3>{garden.name}</h3>
        <h3>{garden.dateCreated}</h3>
        <h3>{garden.gardenLocation}</h3>
        <button
          className="searchPlantButton"
          type="button"
          onClick={() => props.history.push(`/searchplants`)}
        >
          Search Plants
        </button>
      </div>
      <div className="plantCardSect">
        {plants.length === 0 ? (
          <h1>You have no plants</h1>
        ) : (
          plants.map((plant, i) => (
            <PlantCard
              key={plant.personalPlant.id}
              index={i}
              name={plant.personalPlant.name}
              personalPlantObj={plant.personalPlant}
              imageUrl={plant.personalPlant.imageUrl}
              plantId={plant.personalPlant.id}
              gardenId={props.gardenId}
              getAssociatedPlants={getAssociatedPlants}
              {...props}
              openModal={openModal}
              setEditPlant={setEditPlant}
            />
          ))
        )}
        <PersonalPlantModal  
        showModal={modal}
        closeModal={closeModal}
        editPlant={editPlant}
        />
      </div>
    </>
  );
};

export default GardenDetail;
