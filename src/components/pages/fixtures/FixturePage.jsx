import { getFixtures } from "../../routes/FixtureRoutes"
import { useEffect, useState } from "react"
import { premierLeagueTeams } from "@/components/api/Teams"
import { formatDate, formatTime } from "../../functions/Format"
import { Button } from "@/components/ui/button"
import { fetchAllGames } from "../../routes/GameRoutes"
import Loader from "../../loading/Loader"
import { Clock, Calendar, ChevronRight } from "lucide-react"
import { driver } from "driver.js"
import { useHotkeys } from "react-hotkeys-hook"

const FixturePage = () => {
  const [fixtures, setFixtures] = useState({})
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [nextFixture, setNextFixture] = useState(null)


  const playTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      allowClose: false,
      popoverClass: 'driverjs-theme',
      steps: [
        { element: '#next-fixture', popover: { title: 'Next Fixture', description: 'This is the next fixture for West Ham United.' } },
        { element: '#days', popover: { title: 'Countdown', description: `A timer to kick off.` } },
        { element: '#home-team', popover: { title: 'Home Team', description: `The home team for the next fixture is <strong>${nextFixture?.home_team}</strong>.` } },
        { element: '#game-details', popover: { title: 'Game Details', description: `The game will be played at the <strong>${nextFixture.stadium}</strong> in front of <strong>${nextFixture.capacity}</strong> fans on <strong>${formatDate(nextFixture.date)}</strong> at <strong>${formatTime(nextFixture.date)}</strong>.` } },
        { element: '#away-team', popover: { title: 'Away Team', description: `The away team for the next fixture is <strong>${nextFixture.away_team}</strong>.`} },
        { element: '#action', popover: { title: 'Actions', description: `If the game has been added to the system, you can click the button to view. If not, there will be an option to add the game to your calendar.` } },
        { element: '#game-order', popover: { title: 'Game Order', description: `The remaining fixtures are ordered in chronological order, from oldest to latest.` } },
        { popover: { title: 'Completed!', description: 'Thank you for completing the tutorial. Click "Done" to continue.' } },
      ],
    });
  
    driverObj.drive();
  
  }

  useHotkeys("ctrl+h, meta+h", (e) => {
    e.preventDefault()
    playTutorial()
  },
)

  const fetchData = async () => {
    try {
      const response = await getFixtures()
      
      // Find next upcoming fixture
      const now = new Date()
      const upcoming = response
        .filter(f => new Date(f.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      
      if (upcoming.length > 0) {
        console.log(upcoming[0], 'next fixture')
        setNextFixture(upcoming[0])
      }

      const sorted = sortFixtures(response)
      const allGames = await fetchAllGames()
      setGames(allGames)
      setFixtures(sorted)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const sortFixtures = (fixtures) => {
    const sortedFixtures = {}

    fixtures.forEach((fixture) => {
      const date = new Date(fixture.date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const key = `${getMonthName(month)} ${year}`

      if (!sortedFixtures[key]) {
        sortedFixtures[key] = []
      }
      sortedFixtures[key].push(fixture)
    })

    for (const key in sortedFixtures) {
      sortedFixtures[key].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return sortedFixtures
  }

  const getMonthName = (month) => {
    const date = new Date()
    date.setMonth(month - 1)
    return date.toLocaleString("default", { month: "long" })
  }

  const retrieveImg = (name) => {
    const team = premierLeagueTeams.find(
      (team) => team.name.toLowerCase() === name.toLowerCase()
    )
    return team?.badge
  }

  const retrieveGameLink = (name) => {
    const game = games?.find(f => f.name.toLowerCase() === name.toLowerCase())
    return game?.id
  }

  const handleClick = (name) => {
    const gameId = retrieveGameLink(name)
    if (gameId) {
      window.location.href = `/games/${gameId}`
    }
  }

  const getTimeUntilGame = (date) => {
    const now = new Date()
    const gameDate = new Date(date)
    const diff = gameDate - now
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`
    } else {
      return 'Starting soon'
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="space-y-8">
      {/* Next Game Highlight */}
      {nextFixture && (
        <div id='next-fixture' className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Next Game</h3>
              <p id="days" className="text-xs text-gray-600">
                {getTimeUntilGame(nextFixture.date)} away
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="grid grid-cols-3 lg:grid-cols-4 items-center gap-4">
              {/* Home Team */}
              <div id="home-team" className="flex justify-end items-center gap-3">
              <p className="text-right font-bold text-gray-900">
                <span className="sm:hidden">{nextFixture.home_team_abb}</span>
                <span className="hidden sm:inline">{nextFixture.home_team}</span>
              </p>                
              <img
                  className="w-8 h-8"
                  src={retrieveImg(nextFixture.home_team)}
                  alt={nextFixture.home_team}
                />
              </div>

              {/* Date + Time */}
              <div id="game-details" className="flex flex-col items-center text-center rounded-lg p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-900">{formatDate(nextFixture.date)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-600" />
                  <p className="text-xs text-gray-600">{formatTime(nextFixture.date)}</p>
                </div>
              </div>

              {/* Away Team */}
              <div id="away-team" className="flex justify-start items-center gap-3">
                <img
                  className="w-8 h-8"
                  src={retrieveImg(nextFixture.away_team)}
                  alt={nextFixture.away_team}
                />
              <p className="text-right font-bold text-gray-900">
                <span className="sm:hidden">{nextFixture.away_team_abb}</span>
                <span className="hidden sm:inline">{nextFixture.away_team}</span>
              </p>               
              </div>

              {/* Action Button */}
              {games?.some(f => f.name.toLowerCase() === nextFixture?.name.toLowerCase()) ? (
                <Button
                  onClick={() => handleClick(nextFixture?.name)}
                  className="col-span-3 lg:col-span-1 bg-gray-900 hover:bg-gray-800 gap-2"
                  id='action'
                >
                  View Game
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  className="col-span-3 lg:col-span-1"
                  variant='outline'
                >
                  Add to Calendar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* All Fixtures */}
      <div className="space-y-10">
        {Object.entries(fixtures).map(([monthYear, monthFixtures]) => (
          <div key={monthYear} className="space-y-6">
            {/* Month Heading */}
            <div id="game-order" className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{monthYear}</h2>
              <p className="text-xs text-gray-400">{monthFixtures.length} shifts</p>
            </div>

            {/* Fixtures */}
            <div className="space-y-4">
              {monthFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="grid grid-cols-3 lg:grid-cols-4 items-center gap-4 border-b p-4"
                >
                  {/* Home Team */}
                  <div className="flex justify-end items-center gap-3">
                  <p className="text-right font-bold text-gray-900">
                <span className="sm:hidden">{fixture.home_team_abb}</span>
                <span className="hidden sm:inline">{fixture.home_team}</span>
                  </p>                      
                  <img
                      className="w-8 h-8"
                      src={retrieveImg(fixture.home_team)}
                      alt={fixture.home_team}
                    />
                  </div>

                  {/* Date + Time */}
                  <div className="flex flex-col items-center text-center">
                    <p className="text-sm font-medium">{formatDate(fixture.date)}</p>
                    <p className="text-xs text-gray-500">{formatTime(fixture.date)}</p>
                  </div>

                  {/* Away Team */}
                  <div className="flex justify-start items-center gap-3">
                    <img
                      className="w-8 h-8"
                      src={retrieveImg(fixture.away_team)}
                      alt={fixture.away_team}
                    />
                <p className="text-right font-bold text-gray-900">
                <span className="sm:hidden">{fixture.away_team_abb}</span>
                <span className="hidden sm:inline">{fixture.away_team}</span>
              </p>                    
              </div>

                  {/* Action Button */}
                  {games?.some(f => f.name.toLowerCase() === fixture?.name.toLowerCase()) ? (
                    <Button
                      onClick={() => handleClick(fixture?.name)}
                      className="col-span-3 lg:col-span-1 max-w"
                    >
                      View Game
                    </Button>
                  ) : (
                    <Button 
                      className="col-span-3 lg:col-span-1 max-w"
                      variant='outline'
                    >
                      Add to calendar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FixturePage