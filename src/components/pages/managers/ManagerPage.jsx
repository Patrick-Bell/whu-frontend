import { useState, useEffect } from "react"

import { fetchAllManagers } from "@/components/routes/ManagerRoutes"
import ManagerDataTable from "./ManagerDataTable"
import Loader from "../../loading/Loader"

const ManagerPage = () => {
    const [managers, setManagers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try{
            const response = await fetchAllManagers()
            setManagers(response)

        }catch(e){
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (

        <>
        <div>
        
        <ManagerDataTable managers={managers} setManagers={setManagers} />
        </div>
        </>
    )
}

export default ManagerPage