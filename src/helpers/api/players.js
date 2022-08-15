import axios from "axios";
import { baseURL } from ".";

export const getPlayersApi = () => {
    return axios.get(baseURL + 'players');
}

export const getPlayerApi = (id) => {
    return axios.get(baseURL + 'players/' + id);
}

export const deletePlayerApi = (id) => {
    return axios.delete(baseURL + 'players/' + id);
}

export const updatePlayerApi = (e, id) => {
    return axios.put(baseURL + 'players/' + id, {
                    username: e.target.username.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    experience: e.target.experience.value,
                });
}

