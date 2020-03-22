import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantSearch = (props) => {
    
   
    return ( 
        <>
        <h1>{props.name}</h1>
        <p>
             <label>Select list</label>
             <select id = "myList">
                 {}
               <option value = "1">one</option>

             </select>
          </p>
        <button className="addPlantButton" type="button" onClick={() => console.log(`add plant ${props.plantId}`)}>Add Plant</button>
        
        </>
    )

}

export default PlantSearch