import { premierLeagueTeams } from "../api/Teams"

export const findImage = (game) => {
    const fixture = premierLeagueTeams.find(team => team.name === game?.name)
    const team = fixture.home_team === 'West Ham United' ? fixture.home_team : fixture.away_team

    const badge = team.badge
    return badge
    
}