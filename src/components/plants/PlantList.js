import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"
import PlantSearch from "../../components/plants/PlantSearch"

const PlantList = (props) => {
const [searchPlants, setSearchPlants] = useState([])
const [selectGardens, setSelectGardens] = useState([])
const [option, setOption] = useState({value: ""})
useEffect(() => {
    API.getAllPlants().then(plants => setSearchPlants(plants))
    .then(API.getUserGardens(props.apiUser).then(info =>{ 
        setSelectGardens(info.gardens)
         const stateToChange = { ...option};
        stateToChange["value"] = info.gardens[0].id;
        setOption(stateToChange);  
    }))
   
}, [])
const handleChange = (e) => {
    const stateToChange = {...option}
    stateToChange["value"] = parseInt(e.target.value)
    setOption(stateToChange) 
}

const createRelationshipObj = (plantId) => {
    const plantAndGardenObj = {
        gardenId : option.value, 
        plantId : plantId
    }
    API.postPlantToGarden(plantAndGardenObj)
}

return ( 
    <>

    <button type="button" onClick={(() => props.history.push(`/contributeplant`))}>Contribute plant</button>
    <p>
        <label>Select Garden</label>
        <select id = "myGardenList" onChange={handleChange}>
            {selectGardens.map(garden => {
                  return <option key={garden.id} value={garden.id}>{garden.name}</option>  
            })}
        </select>
    </p>
    {searchPlants.map(plant => <PlantSearch key={plant.id} name={plant.name} plantId={plant.id}  apiUser={props.apiUser} userId={plant.userId} selectGardens={selectGardens} createRelationshipObj={createRelationshipObj} {...props}/>) }
    </>
)
}

export default PlantList