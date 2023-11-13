import axios from "axios";

const http = axios.create({baseURL: "https://collectionapi.metmuseum.org"});

export default {
getAllArt() {
    return http.get('/public/collection/v1/objects');
},

getOneArt(id) {
    return http.get(`/public/collection/v1/objects/${id}`);
}
}