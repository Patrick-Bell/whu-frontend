import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"


export const fetchAllWorkers = async () => {
    const response = await axios.get(`${apiUrl}/api/workers`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const deleteOneWorker = async (id) => {
    const response = await axios.delete(`${apiUrl}/api/workers/${id}`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const addNewWorker = async (workerData) => {
    const response = await axios.post(`${apiUrl}/api/workers`, workerData, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const findOneWorker = async (id) => {
    const response = await axios.get(`${apiUrl}/api/workers/${id}`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const editOneWorker = async (id, workerData) => {
    const response = await axios.patch(`${apiUrl}/api/workers/${id}`, workerData, { withCredentials: true })
    return response.data
}

export const sendEmailToWorkers = async (data) => {
    const response = await axios.post(`${apiUrl}/api/send-workers-email`, data, {withCredentials: true}) 
    //console.log(response.data)
    return response.data
}

export const addToWatchList = async (id) => {
    const response = await axios.patch(`${apiUrl}/api/add-watching/${id}`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

export const removeFromWatchList = async (id) => {
    const response = await axios.patch(`${apiUrl}/api/remove-watching/${id}`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}

//