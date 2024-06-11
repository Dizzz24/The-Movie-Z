import axios from "axios"

const instance = axios.create({
    baseURL: "http://dhyz.my.id"
})

export default instance