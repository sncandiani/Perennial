import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PlantEditForm = (props) => {
    const [plants, setPlants] = useState({userId: parseInt(sessionStorage.getItem("userId")), name: "", height: "", sunExposureTypeId: "", waterRequirementTypeId: "", imageUrl: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [sunExposures, setSunExposures] = useState([]);
  const [waterRequirements, setWaterRequirements] = useState([]);
  
  const getSunExposures = () => {
    API.getSunExposureType().then(sunExposureArr => {
      setSunExposures(sunExposureArr);
    });
  };

  const getWaterRequirements = () => {
    API.getWaterRequirementType().then(waterRequirementArr => {
      setWaterRequirements(waterRequirementArr);
    });
  };
  const sunExpFieldChange = e => {
    const stateToChange = { ...plants };
    stateToChange.sunExposureTypeId = parseInt(e.target.value)
    setPlants(stateToChange)
  }

  const waterReqFieldChange = e => {
    const stateToChange = { ...plants };
    stateToChange.waterRequirementTypeId = parseInt(e.target.value)
    setPlants(stateToChange)
  }

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
            sunExposureTypeId: plants.sunExposureTypeId, 
            waterRequirementTypeId: plants.waterRequirementTypeId,
            imageUrl: plants.imageUrl
        }
        API.updatePlant(editedPlant)
        .then(() => {
            props.history.push("/searchplants")
        })
    }

    useEffect(() => {
      getSunExposures();
    getWaterRequirements();
        API.editPlant(props.match.params.plantId).then((plant) => {
            setPlants(plant)
            setIsLoading(false)
        })
    }, [props.match.params.plantId])

    
    
    return (       
            <form className="specialForm">
            <fieldset className="specialFieldset">
            <h1 className="formTitle">Edit Plant</h1>
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
            <select className="select" id="sunExposureList" value={plants.sunExposureTypeId} onChange={sunExpFieldChange}>
              {sunExposures.map(sunExposureInfo => {
      
                 return <option key={sunExposureInfo.id} value={sunExposureInfo.id}>
                 {sunExposureInfo.sunExposure}
               </option>
              })}
               </select>
            </div>
    
            <div className="formContent">
            <label htmlFor="waterRequirements">Water Requirements:</label> <span></span>
            <select className="select" id="waterRequirementList" value={plants.WaterRequirementTypeId}onChange={waterReqFieldChange}>
              {waterRequirements.map(waterRequirementInfo => {
                 return <option key={waterRequirementInfo.id}  value={waterRequirementInfo.id}>
                 {waterRequirementInfo.waterRequirement}
               </option>
              
              })}
               </select>
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