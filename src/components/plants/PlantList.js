import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"
import PlantSearch from "../../components/plants/PlantSearch"

const PlantList = (props) => {
const [searchPlants, setSearchPlants] = useState([])

useEffect(() => {
    API.getAllPlants().then(plants => setSearchPlants(plants))
}, [])



return ( 
    <>
    <button type="button" onClick={(() => props.history.push(`/contributeplant`))}>Contribute plant</button>
    {searchPlants.map(plant => <PlantSearch key={plant.id} name={plant.name} plantId={plant.id}  apiUser={props.apiUser} />) }
    </>
)
}

export default PlantList