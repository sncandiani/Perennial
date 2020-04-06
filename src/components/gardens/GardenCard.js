import React from "react"
import API from "../../modules/ApiManager"

const GardenCard = (props) => {
    return (
        <div className="card-content" >
            <img src={props.garden.imageUrl}></img>
            <p className="gardenName"> {props.garden.name}</p>
                <div className="crudButtons">
                    <button className="editButton" type="button" onClick={() => props.history.push(`gardens/${props.garden.id}/edit`)}>Edit</button>
                    <button className="deleteButton" type="button" onClick={() => {
                        const confirm = window.confirm(`Are you sure you would like to delete ${props.garden.name}?`)
                        if(confirm) {
                        props.deleteGardens(props.garden.id)
                        }    
                    }}>Delete</button>
                    <button className="viewPlantButton" type="button" onClick={() => props.history.push(`gardens/${props.garden.id}`)}>View Full Garden</button>
                </div>
        </div>
    )
}

export default GardenCard