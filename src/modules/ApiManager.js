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
    getSpecificUser(id) {
        return fetch(baseUrl + "users/" + id).then(resp => resp.json())
    }
}

export default API