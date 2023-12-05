import React, { useState, useEffect } from "react";
import StarshipCard from "./components/StarshipCard";
import "./index.css";
import getRandom from "./getRandom";

async function fetchStarshipList() {
  try {
    let data = [];
    let res = {};
    do {
      res = await fetch(res.next || "https://swapi.dev/api/starships").then(
        (response) => response.json()
      );
      data = [...data, ...res.results];
    } while (res.next != null);

    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

function clearText(text) {
  const result = Number(text.replace(/\D/g, ""));
  if (isNaN(result)) {
    return 0;
  }
  return result;
}

const App = () => {
  const [userStarship, setUserStarship] = useState(null);
  const [computerStarship, setComputerStarship] = useState(null);
  const [usedStarship, setUsedStarship] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [round, setRound] = useState(null);
  const [starshipList, setStarshipList] = useState([]);

  const ignoreShip = (ship) => {
    setUsedStarship((usedStarship) => [...usedStarship, ship]);
  };

  const getUserStarship = () => {
    setUserStarship(getRandom(starshipList, usedStarship, ignoreShip));
  };

  const getComputerStarship = () => {
    setComputerStarship(getRandom(starshipList, usedStarship, ignoreShip));
  };

  useEffect(() => {
    fetchStarshipList().then((data) => {
      setStarshipList(data);
    });
  }, []);
  useEffect(() => {
    if (starshipList?.length > 0) {
      getComputerStarship();
      getUserStarship();
    }
  }, [starshipList]);

  useEffect(() => {
    if (round === 10) {
      setMessage(
        playerScore === computerScore
          ? "Draw"
          : playerScore > computerScore
          ? "Player wins"
          : "Computer wins"
      );
      setUserStarship(null);
      setComputerStarship(null);
    }
  }, [starshipList, playerScore, computerScore]);

  const getPropertyValue = (starship, propertyName) => {
    switch (propertyName) {
      case "maxSpeed":
        return clearText(starship.max_atmosphering_speed);
      case "creditCost":
        return clearText(starship.cost_in_credits);
      case "passengers":
        return clearText(starship.passengers);
      case "filmAppearances":
        return starship.films.length;
      default:
        break;
    }
  };

  const compareStarship = (propertyName) => {
    let userValue = getPropertyValue(userStarship, propertyName);
    let computerValue = getPropertyValue(computerStarship, propertyName);

    let userGreaterThanComputer = false;
    let userEqualComputer = userValue === computerValue;

    if (!userEqualComputer) {
      userGreaterThanComputer = userValue > computerValue;
    }
    let message = "";
    if (userEqualComputer) {
      message = "Draw";
      getUserStarship();
      getComputerStarship();
      setRound(round + 1);
    } else if (userGreaterThanComputer) {
      setPlayerScore(playerScore + 1);
      getUserStarship();
      setRound(round + 1);
      message = "You win";
    } else {
      setComputerScore(computerScore + 1);
      getComputerStarship();
      setRound(round + 1);
      message = "You lose";
    }
    setMessage(message);
  };

  return (
    <div>
      <div className="score">
        <div className="player-score">{playerScore}</div>
        <div className="round">Round {round}</div>
        <div className="computer-score">{computerScore}</div>
      </div>
      <div className="game">
        {userStarship && (
          <StarshipCard
            starship={userStarship}
            compareStarship={compareStarship}
          />
        )}
        {computerStarship && (
          <StarshipCard
            starship={computerStarship}
            compareStarship={compareStarship}
          />
        )}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default App;
