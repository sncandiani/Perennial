import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"
import PlantSearch from "../../components/plants/PlantSearch"

const PlantList = (props) => {
const [searchPlants, setSearchPlants] = useState([])
const [selectGardens, setSelectGardens] = useState([])
const [option, setOption] = useState({value: ""})
const [text, setText]= useState("")


const setPlants = (textValue) => {
    API.getAllPlants().then(plants => {
        const filteredPlants = plants.filter(plant => {
             return plant.name.toLowerCase().includes(textValue.toLowerCase()) === true
         }) 
         setSearchPlants(filteredPlants)
    })
   }

useEffect(() => {
    setPlants("ldfgkjhdglfkjh");
    API.getUserGardens(props.apiUser).then(info =>{ 
        setSelectGardens(info.gardens)
         const stateToChange = { ...option};
        stateToChange["value"] = info.gardens[0].id;
        setOption(stateToChange);  
    })

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
const handleTextFieldChange = (e) => {
const stateToChange = {...text}
stateToChange[e.target.id] = e.target.value
setText(stateToChange)
setPlants(e.target.value)
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
    Search:<input id="searchBar" type="text" onChange={handleTextFieldChange}></input>
    {searchPlants.map(plant => <PlantSearch key={plant.id} name={plant.name} plantId={plant.id}  apiUser={props.apiUser} userId={plant.userId} selectGardens={selectGardens} createRelationshipObj={createRelationshipObj} setPlants={setPlants} {...props}/>) }
    </>
)
}

export default PlantList