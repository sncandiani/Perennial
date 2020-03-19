import React from "react"
import API from "../../modules/ApiManager"

const GardenCard = (props) => {
    return (
        <div className="card-content" >
            <p className="taskName"> {props.garden.name}</p>
                <div className="crudButtons">
                    <button className="editButton" type="button" onClick={() => console.log("edit button")}>Edit</button>
                    <button className="deleteButton" type="button" onClick={() => props.deleteGardens(props.garden.id)}>Delete</button>
                </div>
        </div>
    )
}

export default GardenCard