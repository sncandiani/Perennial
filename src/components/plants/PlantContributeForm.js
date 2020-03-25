import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantContributeForm = (props) => {
    const [plants, setPlants] = useState({userId: parseInt(sessionStorage.getItem("userId")), name: "", height: "", sunExposureType: "", waterRequirementType: "", imageUrl: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [sunExposures, setSunExposures] = useState([])
    const [waterRequirements, setWaterRequirements] = useState([])
    //value of plants will be taken in with every change

    const getSunExposures = () => {
      API.getSunExposureType().then((sunExposureArr) => {
        setSunExposures(sunExposureArr)
      })

    }

    const getWaterRequirements = () => {
      API.getWaterRequirementType().then((waterRequirementArr) => {
        setWaterRequirements(waterRequirementArr)
      })
    }

    useEffect(() => {
      getSunExposures()
      getWaterRequirements()
    }, [])
   
    const handleFieldChange = (e) => {
        const stateToChange = {...plants} 
        stateToChange[e.target.id] = e.target.value
        setPlants(stateToChange)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(plants.name === "" || plants.height === "" || plants.sunExposureType === "" || plants.waterRequirementType === "" || plants.imageUrl === ""){
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
          <label>
      Sun Exposure:
      <input list="sunExposures" onChange={handleFieldChange} name="mySunExposure" />  
        </label>   
        <datalist id="sunExposures">
          {sunExposures.map((sunExposureInfo) => 
            <option key={sunExposureInfo.id}>{sunExposureInfo.sunExposure}</option>
          )}
     
  </datalist>
            
  <label>
      Water Requirements:
      <input list="waterRequirements" onChange={handleFieldChange} name="myWaterRequirements" />  
        </label>   
        <datalist id="waterRequirements">
        {waterRequirements.map((waterRequirementInfo) => 
            <option key={waterRequirementInfo.id}>{waterRequirementInfo.waterRequirement}</option>
          )}
     
  </datalist>
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