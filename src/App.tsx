import React, { useState } from "react";
import Launcher from "./components/Launcher/launcher";

import "./stylesheets/index.css";
import Scorecard from "./components/Scorecard/scorecard";
import Arena from "./components/Arena/arena";

const genRandDist = (): number => {
	return Math.trunc(Math.max(Math.random() * 100, 20));
	// return 10;
};

export enum GameState {
	Knocked,
	Drawn,
	Released,
	Hit,
}

let intervalId: NodeJS.Timeout;

function App() {
	const [targetDistance, setTargetDistance] = useState<number>(genRandDist);
	const [score, setScore] = useState<number>(0);
	const [gameState, setGameState] = useState<GameState>(GameState.Knocked);
	const [pastShots, setPastShots] = useState<number[]>([]);
	const [distanceCounter, setDistanceCounter] = useState<number>(0);

	const startTimer = () => {
		intervalId = setInterval(() => {
			setDistanceCounter((d) => Math.min(d + 1, 150));
		}, 20);
	};

	const stopTimer = () => {
		clearInterval(intervalId);
	};

	const animateArrow = () => {
		// arrow will remain "released" proportional to how long the arrow would be in the air
		console.log("starting animation");
		return setTimeout(() => {
			console.log("stopping animation");
			setupNextGameRound();
		}, distanceCounter * 20);
	};

	const setupNextGameRound = () => {
		// I felt 'weird' about this function ALSO calling setGameState
		// but I also do not want to have to do the calculations over again
		// I think it makes fine sense for this function to let its caller know the results of

		// add this distance to past shots
		const tmpArr = pastShots;
		tmpArr.unshift(distanceCounter);
		setPastShots(tmpArr);

		// figure out how close we were to the target
		const curDiff = Math.abs(targetDistance - distanceCounter);
		setDistanceCounter((d) => 0);
		// distanceCounter = 0;

		if (curDiff > 3) {
			// 0 points, game state knocked
			setGameState(GameState.Knocked);
			return;
		}

		if (curDiff <= 1) {
			// 5 points, game state => hit
			setScore(score + 5);
		} else if (curDiff <= 2) {
			// 3 points, game state => hit
			setScore(score + 3);
		} else if (curDiff <= 3) {
			// 1 point, game state => hit
			setScore(score + 1);
		}

		// do animation here
		setGameState(GameState.Hit);
	};

	const resetGame = () => {
		//setScore(0); // set score to 0
		setTargetDistance(genRandDist()); // reset target distance to random value
		setPastShots([]); // empty past shots array
		setGameState(GameState.Knocked); // reset game state to knocke
	};

	const launcherClicked = () => {
		switch (gameState) {
			case GameState.Knocked:
				// arrow is being drawn
				setGameState(GameState.Drawn);
				startTimer();
				break;
			case GameState.Drawn:
				// arrow has been released
				// TODO: do some animation in here
				stopTimer();
				setGameState(GameState.Released);
				animateArrow();
				break;
			case GameState.Hit:
				// game has been reset
				resetGame();
				break;
			default:
				break;
		}
	};

	return (
		<div className="app">
			{/* <h1 className="game-title">Archer!</h1> */}
			<div className="viewport">
				<Scorecard
					gameState={gameState}
					targetDistance={targetDistance}
					score={score}
					pastShots={pastShots}
				/>

				<Arena targetDistance={targetDistance} pastShots={pastShots} />

				<Launcher
					onClick={launcherClicked}
					curState={gameState}
					curCounter={distanceCounter}
				/>
				{gameState === GameState.Drawn && <div>{distanceCounter}</div>}
			</div>

			<a
				href="http://www.aaronparisi.dev"
				target={"_blank"}
				style={{ position: "absolute", bottom: "20px", left: "20px" }}
				rel="noreferrer"
			>
				aaronparisi.dev
			</a>
		</div>
	);
}

export default App;
