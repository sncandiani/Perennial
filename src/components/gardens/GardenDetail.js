import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"
import PlantCard from "../../components/plants/PlantCard"

const GardenDetail = (props) => {
    const [garden, setGarden] = useState({userId: parseInt(sessionStorage.getItem("userId")), name: "", dateCreated: "", gardenLocation: "", imageUrl: ""})
    const [plants, setPlants] = useState([])
   
    const getGardens = () => {
        API.getSpecificGarden(props.gardenId).then(specificGarden => {
            setGarden({
                name: specificGarden.name, 
                dateCreated: specificGarden.dateCreated, 
                gardenLocation: specificGarden.gardenLocation, 
                imageUrl: specificGarden.imageUrl
            })
        })
    }; 
    
    const getAssociatedPlants = () => {
        API.findAssociatedPlants().then(gardenAndPlantInfo => {
            const plantArr = gardenAndPlantInfo.filter(info => info.gardenId === props.gardenId)
            setPlants(plantArr)
        }) 
    }


    useEffect(() => {
        getGardens();
        getAssociatedPlants();
    }, []);

    return(
    <>
        
        <h3>{garden.name}</h3>
        <h3>{garden.dateCreated}</h3>
        <h3>{garden.gardenLocation}</h3>
        <button className="searchPlantButton" type="button" onClick={() => props.history.push(`/searchplants`)}>Search Plants</button>
        {plants.length === 0 ? <h1>You have no plants</h1> : plants.map(plant => <PlantCard key={plant.id} name={plant.plant.name} plantId={plant.plant.id} gardenId={props.gardenId} getAssociatedPlants={getAssociatedPlants} {...props}/> )}
        
    </>
    )
}

export default GardenDetail