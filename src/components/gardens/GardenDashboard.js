import React from "react"
import GardenList from "../gardens/GardenList"

const GardenDashboard = (props) => {
    return (
        <div>
            <div>
                <button className="addGardenBtn" onClick={() => props.history.push("/addgarden")}>Add Garden</button>
            </div>
                <div className="gardenDashboard">
                <GardenList apiUser={props.apiUser} {...props} />
                </div>
                
        </div>
    )
}

export default GardenDashboard