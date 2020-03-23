import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantSearch = (props) => {
    return ( 
        <>
        <h1>{props.name}</h1>
        <button className="addPlantButton" type="button" onClick={() => props.createRelationshipObj(props.plantId)}>Add Plant</button>
        {props.userId === props.apiUser ?
        <>
         <button type="button" onClick={() => props.history.push(`plants/${props.plantId}/edit`)}>Edit your listing</button> 
         <button type="button"  onClick={() => {
           const confirm = window.confirm(`Are you sure you would like to delete your listing for ${props.name}?`)
           if(confirm) {
           API.deletePlant(props.plantId).then(props.setPlants)
           }    
         }}>Delete your listing</button> 
         </>
         : null}
        </>
    )

}

export default PlantSearch