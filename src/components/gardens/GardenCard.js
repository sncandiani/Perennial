import React from "react"
import API from "../../modules/ApiManager"

const GardenCard = (props) => {
    const colorsArray = ["#f08f34", "#97c582", "#f1e2e3"]
    return (
        <div style={{backgroundColor: `${colorsArray[(props.index)%3]}`}}className="card-content" >
             <div className="side1PlantCard">
            <img src={props.garden.imageUrl}></img>
            </div>
            <div className="side2PlantCard">
            <h3 className="gardenHeaders"> {props.garden.name}</h3>
                <div className="crudButtons">
                    <div className="btnColumn">
                    <div className="gardenBtn">
                    <button className="viewPlantButton" type="button" onClick={() => props.history.push(`gardens/${props.garden.id}`)}>View Full Garden</button>
                    </div> 
                    <div className="secondaryBtnRow">
                    <div className="gardenBtn"> 
                    <button className="editButton" type="button" onClick={() => props.history.push(`gardens/${props.garden.id}/edit`)}>Edit</button>
                    </div>
                    <div className="gardenBtn"> 
                    <button className="deleteButton" type="button" onClick={() => {
                        const confirm = window.confirm(`Are you sure you would like to delete ${props.garden.name}?`)
                        if(confirm) {
                        props.deleteGardens(props.garden.id)
                        }    
                    }}>Delete</button>
                    </div>
                    </div>
                    </div>
                    
                    </div>
                </div>
        </div>
    )
}

export default GardenCard