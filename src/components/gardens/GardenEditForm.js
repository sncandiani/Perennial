import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const GardenEditForm = (props) => {
    const [gardens, setGardens] = useState({userId: parseInt(sessionStorage.getItem("user")), name: "", dateCreated: "", gardenLocation: "", imageUrl: ""})
    const [isLoading, setIsLoading] = useState(false)
    //value of gardens will be taken in with every change
    const handleFieldChange = (e) => {
        const stateToChange = {...gardens} 
        stateToChange[e.target.id] = e.target.value
        setGardens(stateToChange)
    }

    const updateGarden = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const editedGarden = {
            id: props.match.params.gardenId,
            userId: gardens.userId,
            name: gardens.name, 
            dateCreated: gardens.dateCreated, 
            gardenLocation: gardens.gardenLocation, 
            imageUrl: gardens.imageUrl
        }
        API.updateGarden(editedGarden)
        .then(() => {
            props.history.push("/")
        })
    }

    useEffect(() => {
        API.editGarden(props.match.params.gardenId).then((garden) => {
            console.log(garden)
            setGardens(garden)
            setIsLoading(false)
        })
    }, [props.match.params.gardenId])

    return (
        <form>
            
        <fieldset>

        <div className="formContent">
        <label htmlFor="name">Garden Name:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="name"
          value={gardens.name}
        />
        </div>
        
        <div className="formContent">
        <label htmlFor="dateCreated">Date Created:</label> <span></span>
        <input
          type="date"
          required
          onChange={handleFieldChange}
          id="dateCreated"
          value={gardens.dateCreated}
        />
        </div>

        <div className="formContent">
        <label htmlFor="gardenLocation">Location:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="gardenLocation"
          value={gardens.gardenLocation}
        />
        </div>

        <div className="formContent">
        <label htmlFor="imageUrl">Image:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="imageUrl"
          value={gardens.imageUrl}
        />
        </div>

        

        <button className="submitButton"
          type="submit"
          disabled={isLoading}
          onClick={updateGarden}
        >Submit</button>


         </fieldset>

    </form>
    )
}

export default GardenEditForm