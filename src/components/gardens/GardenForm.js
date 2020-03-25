import React, {useState} from "react"
import API from "../../modules/ApiManager"
const GardenForm = (props) => {
    const [gardens, setGardens] = useState({userId: parseInt(sessionStorage.getItem("userId")), name: "", dateCreated: "", gardenLocation: "", imageUrl: ""})
    const [isLoading, setIsLoading] = useState(false)
    //value of gardens will be taken in with every change
    const handleFieldChange = (e) => {
        const stateToChange = {...gardens} 
        stateToChange[e.target.id] = e.target.value
        setGardens(stateToChange)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(gardens.name === "" || gardens.dateCreated === "" || gardens.gardenLocation === "" || gardens.imageUrl === ""){
            window.alert("Please complete all fields.")
        } else {
            setIsLoading(true)
            API.postGarden(gardens)
            .then(() => props.history.push("/gardens"))
        }
    }
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
          placeholder="Garden Name"
        />
        </div>
        
        <div className="formContent">
        <label htmlFor="dateCreated">Date Created:</label> <span></span>
        <input
          type="date"
          required
          onChange={handleFieldChange}
          id="dateCreated"
          placeholder="Date Created"
        />
        </div>

        <div className="formContent">
        <label htmlFor="gardenLocation">Location:</label> <span></span>
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="gardenLocation"
          placeholder="Garden Location"
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

export default GardenForm