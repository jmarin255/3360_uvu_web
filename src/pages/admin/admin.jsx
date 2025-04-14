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

            'X-API-Key': '3560a5861a2c93d031ee91ad12f96796'

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

            'X-API-Key': '3560a5861a2c93d031ee91ad12f96796'

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

          'X-API-Key': '3560a5861a2c93d031ee91ad12f96796'

          

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
    
      <div className="container-fluid">
        <div className="row">
    {/* Sidebar for dropdowns */}
          <div className="col-md-3 bg-dark p-3 d-flex flex-column">
            <h4 className="text-warning">Filters:</h4>

            {/* Sport Dropdown */}
            <label htmlFor="sport-select" className="form-label text-danger">Select a Sport:</label>
            <select
              id="sport-select"
              className="form-select mb-3 bg-dark text-light border-warning"
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

            {/* League Dropdown */}
            {selectedSport && (
              <>
                <label htmlFor="league-select" className="form-label text-warning">Select a League:</label>
                <select
                  id="league-select"
                  className="form-select mb-3 bg-dark text-light border-warning"
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

            {/* Bet Types Dropdown */}
            <label htmlFor="bet-type-select" className="form-label text-warning">Select a Bet Type:</label>
            <select
              id="bet-type-select"
              className="form-select mb-3 bg-dark text-light border-warning"
              value={selectedBetType}
              onChange={(e) => setSelectedBetType(e.target.value)}
            >
              <option value="">Select a bet type</option>
              {betTypes.map(betType => (
                <option key={betType.id} value={betType.id}>
                  {betType.name}
                </option>
              ))}
            </select>

            {/* Stat Types Dropdown */}
            <label htmlFor="stat-type-select" className="form-label text-warning bg-dark">Select a Stat Type:</label>
            <select
              id="stat-type-select"
              className="form-select mb-3 bg-dark text-light border-warning"
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

            {/* OU Type Dropdown */}
            {selectedBetType === 'ou' && (
              <>
                <label htmlFor="ou-type-select" className="form-label text-warning">Select OU Type:</label>
                <select
                  id="ou-type-select"
                  className="form-select mb-3 bg-dark text-light border-warning"
                  value={selectedOUType}
                  onChange={(e) => setSelectedOUType(e.target.value)}
                >
                  <option value="">Select OU Type</option>
                  <option value="player">Player Props</option>
                  <option value="game">Game Props</option>
                </select>
              </>
            )}
          </div>

    {/* Main content for results */}
    <div className="col-md-9 text-light p-3 border-start border-warning">
      <h4 className="text-warning">Results:</h4>
      {loading ? (
        <p className="text-warning">Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: "500px" }}>
          <ul className="list-group">
            {eventData.map(event => (
              <li key={event.eventID} className="list-group-item mb-2 bg-dark text-light border border-warning">
                <strong className="text-warning">Event ID:</strong> {event.eventID}<br />
                <strong className="text-warning">Sport:</strong> {event.sportID}<br />
                <strong className="text-warning">League:</strong> {event.leagueID}<br />
                <strong className="text-success">Home Team:</strong> {event.teams ? event.teams.home.names.long : 'N/A'}<br />
                <strong className="text-danger">Away Team:</strong> {event.teams ? event.teams.away.names.long : 'N/A'}<br />
                <strong className="text-warning">Odds:</strong>
                <ul className="list-group mt-2 bg-dark text-light">
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
                              <li key={oddObject.oddID} className="list-group-item bg-dark text-light border border-warning">
                                Stat: {oddObject.statID}, Home/Away: {oddObject.statEntityID}, Period: {oddObject.periodID}, Book Odds: {oddObject.bookOdds || 'N/A'}
                              </li>
                            );
                          }


                          if (oddObject.betTypeID === 'ml3way') {
                            return (
                              <li key={oddObject.oddID} className="list-group-item bg-dark text-light border border-warning">
                                Stat: {oddObject.sideID}, Home/Away: {oddObject.statEntityID}, Period: {oddObject.periodID}, Book Odds: {oddObject.bookOdds || 'N/A'}
                              </li>
                            );
                          }

                          if (oddObject.betTypeID === 'sp') {
                            return (
                              <li key={oddObject.oddID} className="list-group-item bg-dark text-light border border-warning">
                                Home/Away: {oddObject.statEntityID}, Period: {oddObject.periodID}, Spread: {oddObject.bookSpread}, Book Odds: {oddObject.bookOdds || 'N/A'}
                              </li>
                            );
                          }

                          if (oddObject.betTypeID === 'ou' && oddObject.playerID) {
                            const player = event.players[oddObject.playerID];
                            return (
                              <li key={oddObject.oddID} className="list-group-item bg-dark text-light border border-warning">
                                {player && (
                                  <div>
                                    <span className="text-warning">Player: {player.firstName} {player.lastName}</span>, 
                                    <span className="text-success">Team: {player.teamID}</span>
                                  </div>
                                )}
                                <ul className="list-group mt-2 bg-dark text-light">
                                  <li className="list-group-item bg-dark text-light border border-warning">Stat: {oddObject.statID}, Period: {oddObject.periodID}</li>
                                  <li className="list-group-item bg-dark text-light border border-warning">Over/Under: {oddObject.sideID}</li>
                                  <li className="list-group-item bg-dark text-light border border-warning">
                                    Projection: {oddObject.bookOverUnder || 'N/A'}<br />
                                    Odd Value: {oddObject.bookOdds || 'N/A'}
                                  </li>
                                </ul>
                              </li>
                            );
                          }

                          if (oddObject.betTypeID === 'yn' && oddObject.playerID) {
                            const player = event.players[oddObject.playerID];
                            return (
                              <li key={oddObject.oddID} className="list-group-item bg-dark text-light border border-warning">
                                {player && (
                                  <div>
                                    <span className="text-warning">Player: {player.firstName} {player.lastName}</span>, 
                                    <span className="text-success">Team: {player.teamID}</span>
                                  </div>
                                )}
                                <ul className="list-group mt-2 bg-dark text-light">
                                  <li className="list-group-item bg-dark text-light border border-warning">Stat: {oddObject.statID}</li>
                                  <li className="list-group-item bg-dark text-light border border-warning">Yes/No: {oddObject.sideID}</li>
                                  <li className="list-group-item bg-dark text-light border border-warning">
                                    Odd Value: {oddObject.bookOdds || 'N/A'}
                                  </li>
                                </ul>
                              </li>
                            );
                          }

                          return (
                            <li key={oddObject.oddID} className="list-group-item bg-dark text-light border border-warning">
                              Over or under: {oddObject.sideID}, Home or away: {oddObject.statEntityID} , Projection: {oddObject.openBookOverUnder} Book Odds: {oddObject.bookOdds || 'N/A'}
                            </li>
                          );
                        })
                    : 'N/A'}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
</div>
    </MainLayout>
  );
};

export default Admin;
