const baseUrl = "http://localhost:8088/"

const API = {
    postUser(fireBaseUser) {
        return fetch(baseUrl + "users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fireBaseUser)
        })
    },
    getUsers() {
        return fetch(baseUrl + "users/").then(resp => resp.json())
    }, 
    findUser(firebaseUID) {
        return fetch(baseUrl +`users?uid=${firebaseUID}`).then(resp => resp.json())
    }, 
    postGarden(garden) {
        return fetch(baseUrl + "gardens/", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(garden)
        })
    },
    getGardens() {
        return fetch(baseUrl + "gardens/").then(resp => resp.json())
    },
    getSpecificGarden(gardenId) {
        return fetch(baseUrl + "gardens/" + gardenId).then(resp => resp.json())
    },
    getUserGardens(userId){ 
        return fetch(baseUrl + "users/" + userId +"/?_embed=gardens").then(resp => resp.json())
    },
    deleteGarden(id) {
        return fetch(baseUrl + "gardens/" + id, {
            method: "DELETE"
        });
    }, 
    updateGarden(garden) {
        return fetch(baseUrl + "gardens/" + garden.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(garden)
        })
    }, 
    editGarden(gardenId) {
        return fetch(baseUrl + "gardens/" + gardenId ).then(resp => resp.json())
    }, 
    findAssociatedPlants() {
        return fetch(baseUrl + "gardensAndPlants/?_expand=plant").then(resp => resp.json())
    }, 
    getAllPlants() {
        return fetch(baseUrl + "plants").then(resp => resp.json())
    }, 
    postPlant(plant) {
        return fetch(baseUrl + "plants", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(plant)
        })
    }, 
    postPlantToGarden(gardenAndPlantId) {
        return fetch(baseUrl + "gardensAndPlants", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(gardenAndPlantId)
        })
    }, 
    deletePlantToGarden(gardenAndPlantId) {
        return fetch(baseUrl + "gardensAndPlants/" + gardenAndPlantId, {
            method: "DELETE"
        });
    }, 
    getPlantToGardenObjs() {
        return fetch(baseUrl + "gardensAndPlants").then(resp => resp.json())
    }, 
    editPlant(plantId) {
        return fetch(baseUrl + "plants/" + plantId ).then(resp => resp.json())
    }, 
    updatePlant(plant) {
        return fetch(baseUrl + "plants/" + plant.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
    }
}

export default API