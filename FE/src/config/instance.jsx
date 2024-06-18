import axios from "axios"

const instance = axios.create({
    // baseURL: "http://dhyz.my.id"
    baseURL: "http://localhost:3000"
})

export default instance