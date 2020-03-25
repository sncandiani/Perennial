import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";

const PlantSearch = props => {
  const openModal = () => {
    document.getElementById("myModal").style.display = "block";
  };

  const closeSpanModal = () => {
    document.getElementById("myModal").style.display = "none";
  };
  return (
    <>
      <h1>{props.name}</h1>
      <button id="myBtn" onClick={openModal}>
        More Information
      </button>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={closeSpanModal} className="close">
            &times;
          </span>
          <img width="100px" height="100px"src={props.imageUrl}></img>
          <p>{props.name}</p>
          <p>{props.height}</p>
          <p>{props.sunExposure}</p>
          <p>{props.waterRequirements}</p>
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
    </>
  );
};

export default PlantSearch;
