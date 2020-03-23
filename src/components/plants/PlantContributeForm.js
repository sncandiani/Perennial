import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantContributeForm = (props) => {
    const [plants, setPlants] = useState({userId: parseInt(sessionStorage.getItem("userId")), name: "", height: "", sunExposure: "", waterRequirements: "", imageUrl: ""})
    const [isLoading, setIsLoading] = useState(false)
    //value of plants will be taken in with every change
    const handleFieldChange = (e) => {
        const stateToChange = {...plants} 
        stateToChange[e.target.id] = e.target.value
        setPlants(stateToChange)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(plants.name === "" || plants.height === "" || plants.sunExposure === "" || plants.waterRequirements === "" || plants.imageUrl === ""){
            window.alert("Please complete all fields.")
        } else {
            setIsLoading(true)
            API.postPlant(plants)
            .then(() => props.history.push("/searchplants"))
        }
    }
    return (
        <form>
            
        <fieldset>

        <div className="formContent">
        <label htmlFor="name">Plant Name:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="name"
          placeholder="Plant Name"
        />
        </div>
        
        <div className="formContent">
        <label htmlFor="height">Height:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="height"
          placeholder="Height"
        />
        </div>

        <div className="formContent">
        <label htmlFor="sunExposure">Sun Exposure:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="sunExposure"
          placeholder="Sun Exposure"
        />
        </div>

        <div className="formContent">
        <label htmlFor="waterRequirements">Water Requirements:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="waterRequirements"
          placeholder="Water Requirements"
        />
        </div>

        <div className="formContent">
        <label htmlFor="imageUrl">Image:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="imageUrl"
          placeholder="Image Url"
        />
        </div>

        

        

        <button className="submitButton"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        >Submit</button>


         </fieldset>

    </form>
    )
}


export default PlantContributeForm