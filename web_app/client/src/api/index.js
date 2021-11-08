import axios from 'axios'

const api = axios.create({
    baseURL: 'https://freeseats-a3.herokuapp.com/api/freeseats',
})

export const getAllFreeSeats = () => api.get(`/get_all_free_seats`)

const apis = {
    getAllFreeSeats
}

export default apis
