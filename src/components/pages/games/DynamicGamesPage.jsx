import React, { useEffect, useState } from "react";
import { 
  Edit, 
  MoreHorizontal,
  MessageCircle,
  FilterIcon,
  Download,
  ArrowLeft,
  Info,
  Check,
  BadgeCheckIcon,
  LoaderIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import WorkerCards from "../workers/WorkerCards";
import { addCartToGame, getOneGame } from "@/components/routes/GameRoutes";
import { formatDate } from "@/components/functions/Format";
import { findImage } from "@/components/functions/GameFunctions";
import GameTable from "./GameTable";
import AddCartModal from "./AddCartModal";
import AttendanceTable from "./AttendanceTable";
import GameOverview from "./GameOverview";
import GameCards from "./GameCards";
import { G, PDFDownloadLink } from "@react-pdf/renderer";
import GameSummaryPDF from "@/components/pdf/GameSummaryPDF";
import Loader from "../../loading/Loader";
import FilterCarts from "./FilterCarts";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CompleteGameModal from "./CompleteGameModal";
import GameNotFound from "./GameNotFound";
import { Badge } from "@/components/ui/badge";
import { useHotkeys } from "react-hotkeys-hook";

const DynamicGamesPage = () => {
    const { id } = useParams()
    const [game, setGame] = useState(null);
    const [filteredGame, setFilteredGame] = useState(null)
    const [activeTab, setActiveTab] = useState("summary");
    const [loading, setLoading] = useState(true)
    const [completeModal, setCompleteModal] = useState(false)


    const fetchData = async (id) => {
        try{
            const response = await getOneGame(id)
            setGame({
              ...response,
              carts: response.carts || [], // ensure carts is always an array
            })        
            setFilteredGame({
              ...response,
              carts: response.carts || []
            })
          }catch(e){
            console.log(e)
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(id)
    }, [activeTab])

  
    const playTutorial = () => {

    const driverObj = driver({
      showProgress: true,
      allowClose: false,
      popoverClass: 'driverjs-theme',
      steps: [
        { element: '#game-name', popover: { title: 'Game', description: 'This is the event you are currently viewing. It is identifiable by the name and the date.' } },
        { element: '#badge', popover: { title: 'Status', description: 'If the game is in progress, it means you can continue to add and edit carts. Once you submit the game, you will no longer be able to do this. However you will be able to download a PDF summary of the game.' } },
        { element: '#back', popover: { title: 'Back', description: 'To view all games, just click here.' } },
        { element: '#overview-1', popover: { title: 'Overview', description: 'On this page, you can find: <br>- Event Revenue, Programmes Sold and Number of Workers <br>- Match Details <br>- Best Performers for this event <br>-Worst Performers for this event <br>- Overall Game Performance (margins) <br>- Comparison to the previous game <br>- Individual cart breakdown (returns and margins)' } },
        { element: '#summary-2', popover: { title: 'Statistics', description: 'On this page, you can find: <br>- The ability to <strong>add</strong> a cart <br>- All carts and the associated data such as sold, returns and units <br>- The associated worker(s) to each cart <br>- Margins <br>- You can click <strong>download</strong> to view a PDF summary of the event <br>- You can filter the event by margin/sold <br>- Click the <strong>three dots</strong> under actions to edit/delete a cart' } },
        { element: '#attendance-3', popover: { title: 'Attendance', description: 'On this page, you can find: <br>- All workers and the start time and finish time <br>- Hours each worker has worked <br>- How early/late each worker is <br>- Click <strong>download</strong> to view a PDF summary for attendance ' } },
        { popover: { title: 'Tutorial Completed', description: 'Click "Done" to continue using the application.' } },



      ],
    });
  
    driverObj.drive();

  }


  useHotkeys("ctrl+h, meta+h", (e) => {
    e.preventDefault()
    playTutorial()
  },
)


  

  if (loading) {
    return <Loader />
  }

  if (!game) {
    return <GameNotFound />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="block lg:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div id="game-name">
                <h1 className="text-2xl font-bold text-foreground">{game?.name}</h1>
                <p className="text-muted-foreground">{formatDate(game?.date)}</p>
              <Badge
            variant="secondary"
            id='badge'
            className={`flex items-center gap-1 mt-2 ${
              game.complete_status === true ? "bg-green-500 text-white dark:bg-green-600" : "bg-yellow-500 text-white dark:bg-yellow-600"
            }`}
          >
            {game.complete_status === true ? <BadgeCheckIcon className="w-4 h-4" /> : <LoaderIcon className="w-4 h-4 animate-spin" />}
            {game.complete_status === true ? "Completed" : "Pending"}
          </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
              id="back"
              onClick={() => window.location.href = '/games'}
              className="mt-3 lg:mt-0 w-full lg:w-auto inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <Tooltip>
                <TooltipTrigger asChild>
                <button 
                  onClick={() => playTutorial()}
                  className="mt-3 lg:mt-0 lg:w-auto inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Info className="h-4 w-4" />
              </button>               
               </TooltipTrigger>
                <TooltipContent>
                  <p>Click here to view a tutorial of everythig you can get out of this page!</p>
                </TooltipContent>
              </Tooltip>
              
            </div>
          </div>
        </div>



        <div className="border-b border-border mt-4 mb-4">
              <nav id="tabs" className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', index: 1 },
                  { id: 'summary', label: 'Statistics', index: 2 },
                  { id: 'attendance', label: 'Attendance', index: 3 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    id={`${tab.id}-${tab.index}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>


{ activeTab === "summary" && (
    <>
<div className="mt-4">
    <div className="block lg:flex items-center justify-between mb-4">
        <p className="font-bold">Event Summary</p>
        <div className="mt-3 lg:mt-0 flex items-center space-x-2">
              <FilterCarts game={filteredGame} setGame={setFilteredGame} carts={game?.carts} />
              {game.complete_status ? (
                <PDFDownloadLink document={<GameSummaryPDF gameData={game} />}>
                <button className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                </PDFDownloadLink>
              ):(
                <CompleteGameModal game={game} setGame={setGame} />
              )}
              {game.complete_status === false && (
                <AddCartModal setGame={setGame} game={game} setActiveTab={setActiveTab} />
              )}
            </div>
    </div>
</div>
  <GameTable game={filteredGame} setGame={setFilteredGame} carts={game?.carts} />

</>
)}


    {activeTab === "overview" && (
        <>
        <GameOverview setActiveTab={setActiveTab} game={game} />
        </>
    )}

    {activeTab === "attendance" && (
        <>
        <AttendanceTable game={game} />
        </>
    )}


      </div>
    </div>
  );
};

export default DynamicGamesPage;