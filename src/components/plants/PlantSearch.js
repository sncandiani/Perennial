import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantSearch = (props) => {
    return ( 
        <>
        <h1>{props.name}</h1>
        <button className="addPlantButton" type="button" onClick={() => props.createRelationshipObj(props.plantId)}>Add Plant</button>
        {props.userId === props.apiUser ? <button type="button" onClick={() => props.history.push(`plants/${props.plantId}/edit`)}>Edit</button> : console.log("nope")}
        </>
    )

}

export default PlantSearch