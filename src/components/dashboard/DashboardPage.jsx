import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Trophy, UserCheck, Check, TrendingUp, Calendar, Clock, MapPin, Home, Link, User, Gamepad2, Crown, Heart, Settings, ChartBar, Users2, Volleyball, ChartArea, Frame } from 'lucide-react';
import WorkerCards from "../pages/workers/WorkerCards";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import WorkerTable from './WorkerTable';
import { fetchAllWorkers } from '../routes/WorkerRoutes';
import { getMonthFixtures, getNext3Games, last3HomeGames } from '../routes/FixtureRoutes';
import RecentGamesTable from './RecentGamesTable';
import ManagerSummaryTable from './ManagerSummaryTable';
import { fetchAllManagers } from '../routes/ManagerRoutes';
import Loader from '../loading/Loader';
import DashboardCards from './DashboardCards';
import { premierLeagueTeams } from '../api/Teams';
import QuickLinks from './QuickLinks';

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [workers, setWorkers] = useState([])
  const [fixtures, setFixtures] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [thisMonthFixtures, setThisMonthFixtures] = useState([])


  const fetchData = async () => {
    try{
    const response = await fetchAllWorkers()
    const fResponse = await last3HomeGames()
    const mResponse = await fetchAllManagers()
    const fiRespose = await getMonthFixtures()
    setWorkers(response)
    setFixtures(fResponse)
    setManagers(mResponse)
    setThisMonthFixtures(fiRespose)
    }
  catch(e){
    console.log(e)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchData()
  }, [])


  // Sample data
  const games = [
    { id: 1, name: "Championship Final", date: "2025-09-25", opponent: "City Rivals", type: "home", result: "3-2 W" },
    { id: 2, name: "League Match", date: "2025-09-22", opponent: "United FC", type: "away", result: "1-1 D" },
    { id: 3, name: "Cup Semi-Final", date: "2025-09-28", opponent: "Athletic Club", type: "home", result: "2-0 W" }
  ];


  const upcomingGames = [
    { name: "Premier League", date: "2025-09-30", opponent: "Arsenal FC", type: "away", countdown: null },
    { name: "Champions Cup", date: "2025-10-05", opponent: "Barcelona", type: "home", countdown: null },
    { name: "Derby Match", date: "2025-10-12", opponent: "Local Rivals", type: "home", countdown: null }
  ];

  // Calculate countdown for upcoming games
  useEffect(() => {
    const timer = setInterval(() => {
      upcomingGames.forEach(game => {
        const gameDate = new Date(game.date);
        const now = new Date();
        const diff = gameDate - now;
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          game.countdown = `${days}d ${hours}h ${minutes}m`;
        } else {
          game.countdown = "Game Started";
        }
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getGameForDate = (date) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  
    // check against fixture.date (convert to YYYY-MM-DD format)
    return thisMonthFixtures.find(fixture => {
      const fixtureDate = new Date(fixture.date);
      const fixtureStr = `${fixtureDate.getFullYear()}-${String(fixtureDate.getMonth() + 1).padStart(2, '0')}-${String(fixtureDate.getDate()).padStart(2, '0')}`;
      return fixtureStr === dateStr;
    });
  };
  

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    dayNames.forEach(day => {
      days.push(
        <div key={day} className="text-center text-xs font-medium text-gray-600">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-xs"></div>);
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const game = getGameForDate(date);
      const isToday = date === new Date().getDate() && 
                     currentDate.getMonth() === new Date().getMonth() && 
                     currentDate.getFullYear() === new Date().getFullYear();
      
      days.push(
        <div
          key={date}
          className={`
            p-2 text-center cursor-pointer rounded-lg transition-colors text-xs
            ${isToday ? 'border border-gray-200 bg-gray-50 font-semibold' : ''}
            ${game ? 'bg-yellow-200 text-yellow-600 font-bold' : '' }
          `}
          onClick={() => setSelectedDate(date)}
        >
          {date}
        </div>
      );
    }

    return days;
  };


  const retrieveImg = (name) => {
    const team = premierLeagueTeams.find(
      (team) => team.name.toLowerCase() === name.toLowerCase()
    );
    return team?.badge;
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div>
      

        {/* Stats Cards */}
        <DashboardCards />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Workers Table */}
          <WorkerTable workers={workers} />

          {/* Games Table */}
          <RecentGamesTable fixtures={fixtures} />

          {/* Managers Table */}
          <ManagerSummaryTable managers={managers} />
        </div>

        {/* Calendar and Upcoming Games Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Calendar */}
          <div className="block lg:flex border border-gray-200 rounded-lg overflow-hidden col-span-2">
            {/* Left column: Calendar */}
            <div className="flex-1 p-4">
              <div className="flex mb-4 items-center justify-between">
                <div className='flex'>
                  <Calendar size={20} />
                  <p className="ml-2 font-bold text-md">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Games highlighted
              </div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                {renderCalendar()}
              </div>
            </div>

            {/* Separator */}
            <div className="w-px bg-gray-300 self-stretch my-2"></div>

            {/* Right column: Fixtures */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-bold mb-2">Fixtures</h3>
              <div className="text-xs text-gray-500 mb-2">
                Games this month
              </div>
              <ul className="space-y-2">
                {thisMonthFixtures.map((fixture, index) => (
                  <li 
                  key={index} 
                  className="flex items-center justify-between py-2 px-3 border-b border-gray-200"
                >
                  {/* Home team */}
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <img className='h-5 w-5 rounded-full' src={retrieveImg(fixture.home_team)} />
                    <p className="text-sm font-medium">{fixture.home_team_abb}</p>
                  </div>
                
                  {/* Middle: Status / Info */}
                  <div className="flex-1 flex justify-center">
                    {new Date() > new Date(fixture.date) ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full gap-1">
                        <Check size={14} /> Completed
                      </span>
                    ) : (
                      <div className="text-center text-xs text-gray-600">
                        <p>{new Date(fixture.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p>{new Date(fixture.date).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }).slice(0, 5)}</p>
                        <p>{fixture.stadium}</p>
                      </div>
                    )}
                  </div>
                
                  {/* Away team */}
                  <div className="flex items-center gap-2 min-w-[100px] justify-end">
                    <p className="text-sm font-medium">{fixture.away_team_abb}</p>
                    <img className='h-5 w-5 rounded-full' src={retrieveImg(fixture.away_team)} />
                  </div>
                </li>
                
                
                ))}
              </ul>
            </div>
          </div>


        <QuickLinks />


          
        </div>




      </div>
    </div>
  );
};

export default DashboardPage;