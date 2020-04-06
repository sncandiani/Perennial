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

  const colorsArray = ["#f08f34", "#97c582", "#f1e2e3"]

  return (
    <div className="plantCard"  style={{flexDirection:`${props.index%2 === 0 ? "row-reverse" : "row"}`}}>
      <div className="side1PlantCard">
      <img src={props.imageUrl}></img>
      </div>
      <div className="side2PlantCard">
      <h1 style={{ color: `${colorsArray[(props.index)%3]}`}}>{props.name}</h1>
     {props.personalPlantObj.nickname != "" && <h2>{props.personalPlantObj.nickname}</h2>} 
     <div className="btnWrapper">
      <button type="button" onClick={deletePlantToGarden}>
        Delete
      </button>
      <button type="button" onClick={() => {
          props.openModal()
          props.setEditPlant(props.personalPlantObj)
      }}>
        Customize
      </button>
      </div>
      </div>
    </div>
  );
};

export default PlantCard;
