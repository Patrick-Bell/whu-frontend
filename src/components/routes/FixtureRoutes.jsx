import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"


export const addFixture = async (data) => {
    const response = await axios.post(`${apiUrl}/api/fixtures`, data, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const getFixtures = async () => {
    const response = await axios.get(`${apiUrl}/api/fixtures`, { withCredentials: true })
    //console.log(response.data, 'fixtures')
    return response.data
}

export const getNext3Games = async () => {
    const response = await axios.get(`${apiUrl}/api/next-3-games`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const last3HomeGames = async () => {
    const response = await axios.get(`${apiUrl}/api/last-3-home-games`, { withCredentials: true })
    return response.data
}

export const getNextMonthGames = async () => {
    const response = await axios.get(`${apiUrl}/api/next-month-games`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const findOneFixture = async (id) => {
    const response = await axios.get(`${apiUrl}/api/fixtures/${id}`, { withCredentials: true })
    return response.data
}


export const getMonthFixtures = async () => {
    const response = await axios.get(`${apiUrl}/api/get-month-fixtures`, { withCredentials: true })
    return response.data
}