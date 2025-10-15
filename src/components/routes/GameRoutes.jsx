import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"


export const fetchAllGames = async (year) => {
    const response = await axios.get(`${apiUrl}/api/games`, {
        params: { year: year },
        withCredentials: true
    });
    { withCredentials: true }
    return response.data;
}

export const addCartToGame = async (cartData) => {
    const response = await axios.post(`${apiUrl}/api/carts`, { cart: cartData}, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const getOneGame = async (id) => {
    const response = await axios.get(`${apiUrl}/api/games/${id}`, { withCredentials: true })
    //console.log('game', response.data)
    return response.data
}

export const addNewGame = async (gameData) => {
    const response = await axios.post(`${apiUrl}/api/games`, { game: gameData }, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const markGameAsComplete = async (id) => {
    const response = await axios.post(`${apiUrl}/api/completed-game/${id}`, {}, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const deleteSingleGame = async (id) => {
    const response = await axios.delete(`${apiUrl}/api/games/${id}`, {withCredentials: true})
    //console.log(response.data)
    return response.data
}

export const getCurrentMonthGames = async () => {
    const response = await axios.get(`${apiUrl}/api/get-current-month-games`, { withCredentials: true })
    return response.data
}

export const getPreviousMonthGames = async () => {
    const response = await axios.get(`${apiUrl}/api/get-previous-month-games`, { withCredentials: true })
    return response.data
}