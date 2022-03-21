import React, { useRef, useState } from "react";
import Target from "./components/Target/target";
import Launcher from "./components/Launcher/launcher";
import { BiDownArrowCircle } from "react-icons/bi";
import { GiHeavyArrow } from "react-icons/gi";

import "./stylesheets/index.css";
import Scorecard from "./components/Scorecard/scorecard";

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
	const [lastDistFired, setLastDistFired] = useState<number>(0);
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
		setLastDistFired(distanceCounter.current); // this should make the little arrow indicator render
		setPastShots(pastShots.concat(distanceCounter.current));

		const curDiff = Math.abs(targetDistance - lastDistFired);

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
			setScore(score + 5);
		} else if (curDiff <= 3) {
			// 1 point, game state hit
			setScore(score + 5);
		}

		setGameState(GameState.Hit);
	};

	const resetGame = () => {
		setScore(0); // set score to 0
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
		<div className="App">
			<h1>Archer!</h1>
			<Scorecard
				gameState={gameState}
				targetDistance={targetDistance}
				score={score}
				pastShots={pastShots}
			/>

			<div className="arena">
				<GiHeavyArrow className="arrow" />
				<div className="target-wrapper">
					<Target
						distance={targetDistance}
						diff={Math.abs(targetDistance - lastDistFired)}
					/>
				</div>
				{lastDistFired > 0 && (
					<div className="lastHit" style={{ left: `${lastDistFired * 5}px` }}>
						<BiDownArrowCircle />
					</div>
				)}
			</div>

			<Launcher onClick={launcherClicked} curState={gameState} />
		</div>
	);
}

export default App;
