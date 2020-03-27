import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantEditForm = (props) => {
    const [plants, setPlants] = useState({userId: parseInt(sessionStorage.getItem("userId")), name: "", height: "", sunExposureTypeId: null, waterRequirementTypeId: null, imageUrl: ""})
    const [isLoading, setIsLoading] = useState(false)
    
    //value of plants will be taken in with every change
    const handleFieldChange = (e) => {
        const stateToChange = {...plants} 
        stateToChange[e.target.id] = e.target.value
        setPlants(stateToChange)
    }
    const updatePlant = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const editedPlant = {
            id: props.match.params.plantId,
            userId: plants.userId,
            name: plants.name, 
            height: plants.height,
            sunExposureTypeId: plants.sunExposureTypeId.id, 
            waterRequirementTypeId: plants.waterRequirementTypeId.id,
            imageUrl: plants.imageUrl
        }
        API.updatePlant(editedPlant)
        .then(() => {
            props.history.push("/searchplants")
        })
    }

    useEffect(() => {
        API.editPlant(props.match.params.plantId).then((plant) => {
            setPlants(plant)
            setIsLoading(false)
        })
    }, [props.match.params.plantId])

console.log(plants.sunExposureType.sunExposure)

    return (       
            <form className="specialForm">
            <fieldset className="specialFieldset">
    
            <div className="formContent">
            <label htmlFor="name">Plant Name:</label> <span></span>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              value={plants.name}
            />
            </div>
            
            <div className="formContent">
            <label htmlFor="height">Height:</label> <span></span>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="height"
              value={plants.height}
            />
            </div>
    
            <div className="formContent">
            <label htmlFor="sunExposure">Sun Exposure:</label> <span></span>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="sunExposure"
              value={plants.sunExposureType}
            />
            </div>
    
            <div className="formContent">
            <label htmlFor="waterRequirements">Water Requirements:</label> <span></span>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="waterRequirements"
              value={plants.waterRequirementTypeId}
            />
            </div>
    
            <div className="formContent">
            <label htmlFor="imageUrl">Image:</label> <span></span>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="imageUrl"
              value={plants.imageUrl}
            />
            </div>
    
        

        <button className="submitButton"
          type="submit"
          disabled={isLoading}
          onClick={updatePlant}
        >Submit</button>

         </fieldset>

    </form>
    )
}
export default PlantEditForm