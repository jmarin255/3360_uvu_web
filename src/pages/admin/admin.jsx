import { useContext, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [eventData, setEventData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [leaguesData, setLeaguesData] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [playersData, setPlayersData] = useState([]);
  const [betTypes, setBetTypes] = useState([]);
  const [StatTypes, setStatypes]=useState([])
  const [selectedBetType, setSelectedBetType] = useState('');
  const [selectedStatType, setSelectedStatType]=useState('')
  const [selectedOUType, setSelectedOUType] = useState('');


  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('https://api.sportsgameodds.com/v2/leagues/', {
          headers: {
            'X-API-Key': 'f432597dad764f89d7b8e19486c594d1'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }

        const data = await response.json();
        setSportsData(data.data);
      } catch (error) {
        console.error('Error fetching sports: ', error);
        setError('Error fetching sports.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSports();
    }
  }, [token]);

  const fetchEventData = async () => {
    setLoading(true);
    setError('');
    let allEventData = [];
    let nextCursor = null;

    do {
      try {
        const params = new URLSearchParams({
          leagueID: selectedLeague,
         
          oddsAvailable: true,
          finalized: false,
        });

        if (nextCursor) {
          params.append('cursor', nextCursor);
        }

        const response = await fetch(`https://api.sportsgameodds.com/v2/events?${params.toString()}`, {
          method: 'GET',
          headers: {
            'X-API-Key': 'f432597dad764f89d7b8e19486c594d1'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        allEventData = allEventData.concat(data.data);
        nextCursor = data.nextCursor;
      } catch (error) {
        console.error('Error fetching events:', error);
        break;
      }
    } while (nextCursor);

    setEventData(allEventData);
    setLoading(false);
  };

  const fetchPlayersData = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        leagueID: selectedLeague,
      });

      const response = await fetch(`https://api.sportsgameodds.com/v2/players?${params.toString()}`, {
        headers: {
          'X-API-Key': 'f432597dad764f89d7b8e19486c594d1'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }

      const data = await response.json();
      setPlayersData(data.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      setError('Error fetching players.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && selectedLeague) {
      fetchEventData();
      fetchPlayersData();
    }
  }, [token, selectedLeague]);

  const BET_TYPE_NAMES = {
    ml: 'Moneyline',
    ou: 'Over/Under',
    sp: 'Spread',
    ml3way: 'Moneyline 3-Way',
    yn: 'Yes/No',
  };
  
  useEffect(() => {
    
    const betTypesSet = new Set();
    eventData.forEach(event => {
      Object.values(event.odds).forEach(oddObject => {
        betTypesSet.add(oddObject.betTypeID);
      });
    });
  
   
    const formattedBetTypes = Array.from(betTypesSet).map(betTypeID => ({
      id: betTypeID,
      name: BET_TYPE_NAMES[betTypeID] || betTypeID, 
    }));
  
    setBetTypes(formattedBetTypes);
  }, [eventData]);
  

  useEffect(() => {
    const statTypesSet = new Set();
  
    eventData.forEach(event => {
      Object.values(event.odds).forEach(oddObject => {
        if (!selectedBetType || oddObject.betTypeID === selectedBetType) {
          statTypesSet.add(oddObject.statID);
        }
      });
    });
  
    setStatypes(Array.from(statTypesSet));
  }, [eventData, selectedBetType]);
  

  
  

  

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
    const filteredLeagues = sportsData.filter(sport => sport.sportID === e.target.value);
    setLeaguesData(filteredLeagues);
  };

  return (
    <MainLayout title="Admin | MyPage">
      <h2>Welcome {token.username}</h2>
      <div className="container">
        <h1>Sports Data:</h1>
        <label htmlFor="sport-select">Select a Sport:</label>
        <select
          id="sport-select"
          value={selectedSport}
          onChange={handleSportChange}
        >
          <option value="">Select a sport</option>
          {[...new Set(sportsData.map(sport => sport.sportID))].map(sportID => (
            <option key={sportID} value={sportID}>
              {sportID}
            </option>
          ))}
        </select>

        {selectedSport && (
          <>
            <label htmlFor="league-select">Select a League:</label>
            <select
              id="league-select"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
            >
              <option value="">Select a league</option>
              {leaguesData.map(league => (
                <option key={league.leagueID} value={league.leagueID}>
                  {league.name}
                </option>
              ))}
            </select>
          </>
        )}

      


{selectedLeague && (
  <>
    <label htmlFor="bettype-select">Select a Bet Type:</label>
    <select
      id="bettype-select"
      value={selectedBetType}
      onChange={(e) => setSelectedBetType(e.target.value)}
    >
      <option value="">Select a bet type</option>
      {betTypes.map(betType => (
        <option key={betType.id} value={betType.id}>
          {betType.id} ({betType.name})
        </option>
      ))}
    </select>
  </>
)}


{selectedBetType && (
  <>
   
    <label htmlFor="stattype-select">Select a stat criteria</label>
    <select
      id="stattype-select"
      value={selectedStatType}
      onChange={(e) => setSelectedStatType(e.target.value)}
    >
      <option value="">Select a stat type</option>
      {StatTypes.map(statType => (
        <option key={statType} value={statType}>
          {statType}
        </option>
      ))}
    </select>

    
    {selectedBetType === 'ou' && (
      <>
        <label htmlFor="ou-type-select">Select OU Type:</label>
        <select
          id="ou-type-select"
          value={selectedOUType}
          onChange={(e) => setSelectedOUType(e.target.value)}
        >
          <option value="">Select OU Type</option>
          <option value="player">Player Props</option>
          <option value="game">Game Props</option>
        </select>
      </>
    )}
  </>
)}


        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
          {eventData.map(event => (
            <li key={event.eventID}>
              <strong>Event ID:</strong> {event.eventID}<br />
              <strong>Sport:</strong> {event.sportID}<br />
              <strong>League:</strong> {event.leagueID}<br />
              <strong>Home Team:</strong> {event.teams ? event.teams.home.names.long : 'N/A'}<br />
              <strong>Away Team:</strong> {event.teams ? event.teams.away.names.long : 'N/A'}<br />
              <strong>Odds:</strong>
              <ul>
              {event.odds
                  ? Object.values(event.odds)


                  
                      .filter(oddObject =>
                        (!selectedBetType || oddObject.betTypeID === selectedBetType) &&
                        (!selectedStatType || oddObject.statID === selectedStatType) &&
                        (selectedBetType !== 'ou' || 
                          (selectedOUType === 'player' && oddObject.playerID) || 
                          (selectedOUType === 'game' && !oddObject.playerID))
                      )


                      
                      .map(oddObject => {
                        if (oddObject.betTypeID === 'ml') {
                          
                          return (
                            <li key={oddObject.oddID}>
                              Stat: {oddObject.statID}, Home or away: {oddObject.statEntityID}, Period: {oddObject.periodID}, Book Odds: {oddObject.bookOdds || 'N/A'}
                            </li>
                          );
                        }


                        if (oddObject.betTypeID === 'ml3way') {
                          return (
                            <li key={oddObject.oddID}>
                              Stat: {oddObject.sideID}, Home or away: {oddObject.statEntityID}, Period: {oddObject.periodID}, Book Odds: {oddObject.bookOdds || 'N/A'}
                            </li>
                          );
                        }


                        if (oddObject.betTypeID === 'sp') {
                          return (
                            <li key={oddObject.oddID}>
                              Home or away: {oddObject.statEntityID}, Period: {oddObject.periodID}, Spread: {oddObject.bookSpread} Book Odds: {oddObject.bookOdds || 'N/A'}
                            </li>
                          );
                        }
                        
                        if (oddObject.betTypeID === 'ou' && oddObject.playerID) {
                          const player = event.players[oddObject.playerID]; 
                          return (
                            <li key={oddObject.oddID}>
                              {player && (
                                <div>
                                  <span>Player: {player.firstName} {player.lastName}</span>, 
                                  <span> Team: {player.teamID}</span>
                                </div>
                              )}
                              <ul>
                                <li>Stat: {oddObject.statID}</li>
                                <li>Over/under: {oddObject.sideID}</li>
                                <ul>
                                  <li>Projection: {oddObject.bookOverUnder || 'N/A'}</li>
                                  <li>Odd Value: {oddObject.bookOdds || 'N/A'}</li>
                                </ul>
                              </ul>
                            </li>
                          );
                        }



                        if (oddObject.betTypeID === 'yn' && oddObject.playerID) {
                          const player = event.players[oddObject.playerID]; 
                          return (
                            <li key={oddObject.oddID}>
                              {player && (
                                <div>
                                  <span>Player: {player.firstName} {player.lastName}</span>, 
                                  <span> Team: {player.teamID}</span>
                                </div>
                              )}
                              <ul>
                                <li>Stat: {oddObject.statID}</li>
                                <li>Yes or no: {oddObject.sideID}</li>
                                <ul>
                                  <li>Odd Value: {oddObject.bookOdds || 'N/A'}</li>
                                </ul>
                              </ul>
                            </li>
                          );
                        }


                     
                        
                        
                       
                        return (
                          <li key={oddObject.oddID}>
                            Odd ID: {oddObject.oddID}, Projection: {oddObject.bookOverUnder || 'N/A'}, Odd Value: {oddObject.bookOdds || 'N/A'}
                          </li>
                        );
                        
                        

                      })
                  : 'N/A'}

              

               
              </ul>
            </li>
          ))}
        </ul>
        


        )}
      </div>
    </MainLayout>
  );
};

export default Admin;
