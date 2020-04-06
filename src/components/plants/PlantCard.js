import React, { useEffect, useState } from "react";
import API from "../../modules/ApiManager";
const PlantCard = props => {
  const deletePlantToGarden = () => {
    API.getPlantToGardenObjs().then(objs => {
      objs.forEach(obj => {
        if (
          obj.personalPlantId === props.plantId &&
          obj.gardenId === props.gardenId
        ) {
          const confirm = window.confirm(
            `Are you sure you would like to delete ${props.name}?`
          );
          if (confirm) {
            API.deletePlantToGarden(obj.id)
              .then(props.getAssociatedPlants)
              .then(API.deletePersonalPlant(obj.id));
          }
        } else {
          console.log("not a match!");
        }
      });
    });
  };


  return (
    <div className="plantCard">
      <h1>{props.name}</h1>
     {props.personalPlantObj.nickname != "" && <h2>{props.personalPlantObj.nickname}</h2>} 
      <img src={props.imageUrl}></img>
      <button type="button" onClick={deletePlantToGarden}>
        Delete
      </button>
      <button type="button" onClick={() => {
          props.openModal()
          props.setEditPlant(props.personalPlantObj)
      }}>
        Customize
      </button>

      <button type="button">Notes</button>
      
    </div>
  );
};

export default PlantCard;
