import { useEffect, useState } from "react"
import { ArrowUp, Calendar, Calendar1, Crown, File, ThumbsDown, ThumbsUp } from "lucide-react"
import WorkerCards from "../workers/WorkerCards"
import { Badge } from "@/components/ui/badge"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { formatCurrency, formatDate, formatTime } from "../../functions/Format";
import { Button } from "@/components/ui/button";
import { getFixtures } from "../../routes/FixtureRoutes";
import { premierLeagueTeams } from "@/components/api/Teams";
import GameBarChart from "./GameBarChart";
import GameCartComparisonChart from "./GameCartComparisonChart";
import LastGameComparison from "./LastGameComparison";
import GameCards from "./GameCards";

const GameOverview = ({ game, setActiveTab }) => {
    const [topPerformers, setTopPerformers] = useState([])
    const [worstPerformers, setWorstPerformers] = useState([])
    const [fixtures, setFixtures] = useState([])
    const [selectedGame, setSelectedGame] = useState(null)

    const performanceData = async () => {
        const top = game?.carts?.map((cart) => {
            const value = cart.total_value
            const expected = cart.worker_total
            const margin = expected - value
            return { worker: cart.cart_workers.map(cw => cw.worker.name).join(", "), margin, sold: cart.sold, quantity: cart.final_quantity }
        })

        console.log(top, 'top')

        const sorted = top.sort((a, b) => b.margin - a.margin).slice(0, 3)
        const worst = top.sort((a, b) => a.margin - b.margin).slice(0, 3)
        setWorstPerformers(worst)
        setTopPerformers(sorted)
        console.log(sorted)

        const games = await getFixtures()
        setFixtures(games)
    }

    useEffect(() => {
        performanceData()
    }, [])

    useEffect(() => {
      if (fixtures.length && game) {
        const match = fixtures.find(f => f.name === game.name && f.id === game.fixture_id)
        const homeBadge = premierLeagueTeams.find(t => t.name === match?.home_team).badge
        const awayBadge = premierLeagueTeams.find(t => t.name === match?.away_team).badge
        console.log(match, 'match')
        setSelectedGame({
          match,
          homeBadge,
          awayBadge
        })
      }
    }, [fixtures, game])

    console.log(selectedGame, 'selected game')



    return (


        <>
        {game?.carts?.length > 0 ? (
          <>
           <GameCards game={game} />

<grid className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

    <div className="border border-gray-200 p-4 mt-4 rounded-lg">
    <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center">
            <ThumbsUp />
            <p className="ml-2 font-bold text-md">Best Performers</p>
            </div>
            <div>
                <Button onClick={() => setActiveTab('summary')}>View</Button>
            </div>
        </div>
        <Table>
<TableCaption>Best Performers for the {game.name} fixture.</TableCaption>
<TableHeader>
  <TableRow>
  <TableHead className='font-bold'>#</TableHead>
    <TableHead className='font-bold'>Name</TableHead>
    <TableHead className='font-bold'>Sold</TableHead>
    <TableHead className='font-bold'>Sell %</TableHead>
    <TableHead className='font-bold text-right'>Margin</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {topPerformers
    .map((person, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{person?.worker}</TableCell>
          <TableCell>{person?.sold}</TableCell>
          <TableCell>{((person?.sold / person.quantity) * 100).toFixed(0)}%</TableCell>
          <TableCell className='text-right'>{formatCurrency(person?.margin)}</TableCell>
        </TableRow>
      );
    })}
</TableBody>
</Table>
    </div>



    <div className="border border-gray-200 p-4 mt-4 rounded-lg">
    <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center">
            <ThumbsDown />
            <p className="ml-2 font-bold text-md">Worst Performers</p>
            </div>
            <div>
                <Button onClick={() => setActiveTab('summary')}>View</Button>
            </div>
        </div>
        <Table>
<TableCaption>Worst performers for the {game.name} fixture.</TableCaption>
<TableHeader>
  <TableRow>
  <TableHead className='font-bold'>#</TableHead>
    <TableHead className='font-bold'>Name</TableHead>
    <TableHead className='font-bold'>Sold</TableHead>
    <TableHead className='font-bold'>Sell %</TableHead>
    <TableHead className='font-bold text-right'>Margin</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {worstPerformers
    .map((person, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{person?.worker}</TableCell>
          <TableCell>{person?.sold}</TableCell>
          <TableCell>{((person?.sold / person.quantity) * 100).toFixed(0)}%</TableCell>
          <TableCell className='text-right'>{formatCurrency(person?.margin)}</TableCell>
        </TableRow>
      );
    })}
</TableBody>
</Table>
    </div>





    <div className="border border-gray-200 p-4 mt-4 rounded-lg">
    <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center">
            <File />
            <p className="ml-2 font-bold text-md">Match Details</p>
            </div>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <p className="text-xs">Date</p>
          <p className="text-xs">{formatDate(selectedGame?.match.date)}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <p className="text-xs">Home Team</p>
          <div className="flex items-center">
          <img className="h-5 w-5" src={selectedGame?.homeBadge} />
          <p className="text-xs ml-1">{selectedGame?.match.home_team}</p>
          </div>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <p className="text-xs">Away Team</p>
          <div className="flex items-center">
          <img className="h-5 w-5" src={selectedGame?.awayBadge} />
          <p className="text-xs ml-1">{selectedGame?.match.away_team}</p>
          </div>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <p className="text-xs">Stadium</p>
          <p className="text-xs">{selectedGame?.match.stadium}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <p className="text-xs">Kick Off</p>
          <p className="text-xs">{formatTime(selectedGame?.match?.date)}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <p className="text-xs">Competition</p>
          <p className="text-xs">{selectedGame?.match.competition}</p>
        </div>

       
    </div>




</grid>

<div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4">

          <div><GameBarChart game={game} /></div>

          <div className="border border-gray-200 p-4 rounded-lg">
          <LastGameComparison game={game} />
          </div>
        </div>

        <div className="mt-4">
        <GameCartComparisonChart game={game} />
        </div>

          </>
        ):(
          <p className="text-sm text-gray-500">There must be at least one cart added to this game to view this page. Please navigate over to <span className="font-bold text-xs">STATISTICS</span> to add a cart</p>
        )}
        </>
       
    )
}

export default GameOverview