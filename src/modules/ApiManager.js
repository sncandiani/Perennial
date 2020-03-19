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
    getUserGardens(id){ 
        return fetch(baseUrl + "users/" + id +"/?_embed=gardens").then(resp => resp.json())
    },
    deleteGarden(id) {
        return fetch(baseUrl + "gardens/" + id, {
            method: "DELETE"
        });
    }
}

export default API