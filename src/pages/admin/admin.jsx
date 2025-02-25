import { useContext, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {
  const { token } = useContext(AuthContext);
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.the-odds-api.com/v4/sports?apiKey=39abb97c759a2e7e7a1c497a70375bd2');
        const data = await response.json();
        console.log("Full API Response:", response); // Log the full API response
        console.log("Response Data:", data); // Log the API response data

        if (data) {
          setSportsData(data);
          console.log("Sports Data Set:", data); // Log the data being set
        } else {
          console.log("No data found in the API response.");
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <MainLayout title="Admin | MyPage">
      <h2>Welcome {token.username}</h2>
      <div className="container">
        <h1>Sports Data:</h1>
        {sportsData.length > 0 ? (
          <ul>
            {sportsData.map(sport => (
              <li key={sport.key}>
                <strong>Key:</strong> {sport.key}<br />
                <strong>Title:</strong> {sport.title}<br />
                <strong>Group:</strong> {sport.group}<br />
                <strong>Description:</strong> {sport.description}<br />
                <strong>Active:</strong> {sport.active ? 'Yes' : 'No'}<br />
                <strong>Has Outrights:</strong> {sport.has_outrights ? 'Yes' : 'No'}<br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Admin;