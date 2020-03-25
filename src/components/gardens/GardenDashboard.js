import React from "react"
import GardenList from "../gardens/GardenList"

const GardenDashboard = (props) => {
    return (
        <>
        <div className="gardenDashboard">
            <button className="addGardenBtn" onClick={() => props.history.push("/addgarden")}>Add Garden</button>
            <GardenList apiUser={props.apiUser} {...props} />
        </div>
        </>
    )
}

export default GardenDashboard