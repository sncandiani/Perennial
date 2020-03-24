import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";
import GardenCard from "../gardens/GardenCard";

const GardenList = props => {
  const [gardens, setGardens] = useState([]);
  //gets gardens from database and sets those gardens to gardens that can be accessed in the list
  const getGardens = () => {
    API.getUserGardens(props.apiUser).then(info => {
      setGardens(info.gardens);
    });
  };
  //takes in a garden id and gets new gardens value from the database
  const deleteGardens = id => {
    API.deleteGarden(id).then(() => {
      API.getUserGardens(props.apiUser).then(info => {
        setGardens(info.gardens);
      });
    });
  };
  useEffect(() => {
    getGardens();
  }, []);

  return (
    <div className="container-card">
      {gardens.length === 0 ? (
        <h1>You have no gardens</h1>
      ) : (
        gardens.map(garden => (
          <GardenCard
            key={garden.id}
            garden={garden}
            deleteGardens={deleteGardens}
            {...props}
          />
        ))
      )}
    </div>
  );
};

export default GardenList;
