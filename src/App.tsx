import React, { useRef, useState } from "react";
import Launcher from "./components/Launcher/launcher";

import "./stylesheets/index.css";
import Scorecard from "./components/Scorecard/scorecard";
import Arena from "./components/Arena/arena";

const genRandDist = (): number => {
	return Math.trunc(Math.max(Math.random() * 100, 20));
};

export enum GameState {
	Knocked,
	Drawn,
	Fired,
	Hit,
}

let intervalId: NodeJS.Timeout;

function App() {
	const [targetDistance, setTargetDistance] = useState<number>(genRandDist);
	const [score, setScore] = useState<number>(0);
	const [lastDistFired, setLastDistFired] = useState<number>(0); // this can be removed
	const [gameState, setGameState] = useState<GameState>(GameState.Knocked);
	const [pastShots, setPastShots] = useState<number[]>([]);

	const distanceCounter = useRef<number>(0);

	const startTimer = () => {
		intervalId = setInterval(() => {
			distanceCounter.current += 1;
		}, 20);
	};

	const stopTimer = () => {
		clearInterval(intervalId);
	};

	const setArrowDistance = () => {
		setLastDistFired(distanceCounter.current);

		const tmpArr = pastShots;
		tmpArr.unshift(distanceCounter.current);
		// setPastShots(pastShots.concat(distanceCounter.current));
		setPastShots(tmpArr);

		const curDiff = Math.abs(targetDistance - distanceCounter.current);
		distanceCounter.current = 0;

		if (curDiff > 3) {
			// 0 points, game state knocked
			setGameState(GameState.Knocked);
			return;
		}

		if (curDiff <= 1) {
			// 5 points, game state hit
			setScore(score + 5);
		} else if (curDiff <= 2) {
			// 3 points, game state hit
			setScore(score + 3);
		} else if (curDiff <= 3) {
			// 1 point, game state hit
			setScore(score + 1);
		}

		setGameState(GameState.Hit);
	};

	const resetGame = () => {
		//setScore(0); // set score to 0
		setTargetDistance(genRandDist()); // reset target distance to random value
		setLastDistFired(0); // set last distance fired to 0
		setPastShots([]);
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
				setGameState(GameState.Fired);
				setArrowDistance();
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

				<Arena
					targetDistance={targetDistance}
					lastDistFired={lastDistFired}
					pastShots={pastShots}
				/>

				<Launcher onClick={launcherClicked} curState={gameState} />
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
