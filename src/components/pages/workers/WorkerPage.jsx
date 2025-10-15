import { useState, useEffect } from "react"
import axios from "axios"
import { fetchAllWorkers } from "@/components/routes/WorkerRoutes"
import DataTableDemo from "./WorkerDataTable"
import WorkerCards from "./WorkerCards"
import EditWorkerModal from "./EditWorkerModal"
import Loader from "../../loading/Loader"

const WorkersPage = () => {
    const [workers, setWorkers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try{
            const response = await fetchAllWorkers()
            setWorkers(response)

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
        <WorkerCards workers={workers} />
        <DataTableDemo workers={workers} setWorkers={setWorkers} />
        </div>
        </>
    )
}

export default WorkersPage