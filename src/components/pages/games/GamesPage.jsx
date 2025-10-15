import { fetchAllGames } from "@/components/routes/GameRoutes"
import { useEffect, useState } from "react"
import WorkerCards from "../workers/WorkerCards"
import GameDataTable from "./GameDataTable"
import AddGameModal from "./AddGameModal"
import Loader from "../../loading/Loader"
import GamesCards from "./GamesCards"

const GamesPage = () => {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try{
            const response = await fetchAllGames()
            setGames(response)
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
        <GamesCards games={games} />
        <GameDataTable games={games} setGames={setGames} />
        
        </>
    )
}

export default GamesPage