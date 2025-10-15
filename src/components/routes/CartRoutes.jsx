import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const deleteCart = async (id) => {
    const response = await axios.delete(`${apiUrl}/api/carts/${id}`, { withCredentials: true })
    //console.log(response.data)
    return response.data
}


export const getOneCart = async (id) => {
    const response = await axios.get(`${apiUrl}/api/carts/${id}`, { withCredentials: true})
   // console.log(response.data)
    return response.data
}

export const updateOneCart = async (id, cartData) => {
    const response = await axios.patch(`${apiUrl}/api/carts/${id}`, cartData, { withCredentials: true })
    //console.log(response.data)
    return response.data
}
