import React, { useEffect, useState } from "react"
import API from "../../modules/ApiManager"

const PlantCard = (props) => {
    const deletePlantToGarden = () => {
        API.getPlantToGardenObjs()
    .then((objs) => {
        
         objs.forEach(obj => {
            if(obj.personalPlantId === props.plantId && obj.gardenId === props.gardenId) {
            const confirm = window.confirm(`Are you sure you would like to delete ${props.name}?`)
                if(confirm) {
                API.deletePlantToGarden(obj.id)
                .then(props.getAssociatedPlants)
                }    
        } else {
            console.log("not a match!")
        } 
        }) 
    })
    }


    
return ( 
   
    <>
    
    <h1>{props.name}</h1>
    <img width="200px" height="100px"src={props.imageUrl}></img>
    <button type="button" onClick={deletePlantToGarden}>Delete</button>
    </>
)
}

export default PlantCard