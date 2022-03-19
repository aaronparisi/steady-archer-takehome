import React, { useCallback, useEffect, useState } from "react";
import Target from "./components/Target/index";
import Launcher from "./components/Launcher/index";
import { BiDownArrowCircle } from "react-icons/bi";

import "./stylesheets/index.css";

const genRandDist = (): number => {
	return Math.trunc(Math.max(Math.random() * 100, 20));
};

function App() {
	const [targetDistance, setTargetDistance] = useState<number>(genRandDist);
	const [score, setScore] = useState<number>(0);
	const [diff, setDiff] = useState<number | null>(null); // dummy large val w no score
	const [lastDistFired, setLastDistFired] = useState<number>(0);

	const fireArrow = useCallback(
		(distance: number): void => {
			// fire arrow
			console.log(`fired ${distance}`);

			// calculate diff between distance arrow was fired and target distance
			setDiff(Math.abs(targetDistance - distance)); // redundant
			setLastDistFired(distance);
		},
		[targetDistance]
	);

	useEffect(() => {
		if (diff === null || diff > 3) {
			// no points
			return;
		}

		// modifiy scores
		if (diff < 1) {
			// busslsye
			setScore(5);
		} else if (diff < 2) {
			// 3 points
			setScore(3);
		} else if (diff < 3) {
			// 1 point
			setScore(1);
		}

		// reset target distance
		setTargetDistance(genRandDist());
		setLastDistFired(0);

		// wanted to show which ring you hit
		// debated making an "end of game" state + manual reset
		// tried this out as a sort of "pause"
		// setTimeout(() => {
		// 	setTargetDistance(genRandDist());
		// }, 2000); // this breaks it, something with the timeout and the interval idk yet
	}, [diff]);

	return (
		<div className="App">
			<h1>Archer!</h1>
			<div className="arena">
				<Launcher onFire={fireArrow} />
				<div className="target-wrapper">
					{lastDistFired > 0 && (
						<div className="lastHit" style={{ left: `${lastDistFired * 5}px` }}>
							<BiDownArrowCircle />
						</div>
					)}
					<Target distance={targetDistance} diff={diff} />
				</div>
			</div>

			<div>Score: {score}</div>
			<div>{`Target is ${targetDistance} away`}</div>
			<div>
				{diff !== null && `You were ${diff} feet away!  Went ${lastDistFired}`}
			</div>
		</div>
	);
}

export default App;
