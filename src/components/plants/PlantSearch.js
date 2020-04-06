import React from "react";
import API from "../../modules/ApiManager";

const PlantSearch = props => {
  const openModal = () => document.getElementById(`modal--${props.index}`).style.display = "block";


  const closeSpanModal = () => document.getElementById(`modal--${props.index}`).style.display = "none";

 
  return (
    <div className="plantSearchResults">
      <h1>{props.name}</h1>
      <button id="myBtn" onClick={openModal}>
        More Information
      </button>
      <div id={`modal--${props.index}`} className="modal">
        <div className="modal-content">
          <span onClick={closeSpanModal} className="close">
            &times;
          </span>
          <div className="modal-information">
          <div className="side1PlantCard">
         <img src={props.plantObj.imageUrl}></img>
         </div>
         <div className="side2PlantCard">
          <p>Name: {props.plantObj.name}</p>
          <p>Height: {props.plantObj.height}</p>
          <p>Sun Exposure: {props.plantObj.sunExposureType.sunExposure}</p>
          <p>Water Requirements: {props.plantObj.waterRequirementType.waterRequirement}</p>
          </div>
          </div>
        </div>
      </div>
      <button
        className="addPlantButton"
        type="button"
        onClick={() => {
          if (props.selectGardens[0].name === "No Gardens Available") {
            window.alert("You must create a garden to add a plant");
          } else {
            props.createRelationshipObj(props.plantObj);
          }
        }}
      >
        Add Plant
      </button>
      {props.userId === props.apiUser ? (
        <>
          <button
            type="button"
            onClick={() => props.history.push(`plants/${props.plantId}/edit`)}
          >
            Edit your listing
          </button>
          <button
            type="button"
            onClick={() => {
              const confirm = window.confirm(
                `Are you sure you would like to delete your listing for ${props.name}?`
              );
              if (confirm) {
                API.deletePlant(props.plantId).then(props.setPlants);
              }
            }}
          >
            Delete your listing
          </button>
        </>
      ) : null}
    </div>
  );
};

export default PlantSearch;
