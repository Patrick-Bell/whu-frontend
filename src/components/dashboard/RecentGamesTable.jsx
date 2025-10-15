import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { premierLeagueTeams } from '../api/Teams';
import { formatCurrency, formatDate } from '../functions/Format';
import { fetchAllGames } from '../routes/GameRoutes';
import { worker } from 'globals';

const RecentGamesTable = ({ fixtures }) => {
  const [linkedFixtures, setLinkedFixtures] = useState([]);

  useEffect(() => {
    const linkFixtures = async () => {
      const games = await fetchAllGames();

      const linked = fixtures.map((fixture) => {
        const match = games.find(
          (g) =>
            g.name.trim().toLowerCase() === fixture.name.trim().toLowerCase() &&
            new Date(g.date).toISOString().slice(0, 10) ===
              new Date(fixture.date).toISOString().slice(0, 10)
        );

        return {
          ...fixture,
          matchId: match?.id,
          carts: match?.carts || [],
        };
      });

      setLinkedFixtures(linked);
    };

    if (fixtures?.length) {
      linkFixtures();
    }
  }, [fixtures]);

  const retrieveImg = (name) => {
    const team = premierLeagueTeams.find(
      (team) => team.name.toLowerCase() === name.toLowerCase()
    );
    return team?.badge;
  };

  return (
    <div className="border border-gray-200 p-4 mt-4 rounded-lg">
      <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center">
          <Trophy size={20} />
          <p className="ml-2 font-bold text-md">Recent Games</p>
        </div>
        <div>
          <Button onClick={() => window.location.href = '/games'}>View All</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Latest match results and performance</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Game</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Margin</TableHead>
            <TableHead className="font-bold text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {linkedFixtures.map((game) => {
            const homeImg = retrieveImg(game.home_team);
            const awayImg = retrieveImg(game.away_team);
            const expectedValue = game.carts?.reduce((acc, cart) => acc + cart.total_value, 0);
            const workerValue = game.carts?.reduce((acc, cart) => acc + cart.worker_total, 0);
            const margin = workerValue - expectedValue;
            const color = margin === 0 ? 'text-gray-500' : margin > 0 ? 'text-green-500' : 'text-red-500';

            return (
              <TableRow key={game.id}>
                <TableCell>
                  <span className="flex gap-1">
                    <img className="w-5 h-5" src={homeImg} alt={game.home_team}/>
                    <img className="w-5 h-5" src={awayImg} alt={game.away_team}/>
                  </span>
                </TableCell>
                <TableCell>{formatDate(game.date)}</TableCell>
                <TableCell className={color}>{formatCurrency(margin)}</TableCell>
                <TableCell className="flex justify-end">
                  {game.matchId ? (
                    <ArrowRight
                      onClick={() =>
                        (window.location.href = `/games/${game.matchId}`)
                      }
                      className="w-5 h-5 text-gray-400 hover:text-black transition-colors cursor-pointer"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentGamesTable;
